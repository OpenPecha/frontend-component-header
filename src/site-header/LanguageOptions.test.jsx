/* eslint-disable react/prop-types */
import React from 'react';
import { handleRtl, IntlProvider } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { mergeConfig, publish } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';

import { Menu, MenuTrigger, MenuContent } from '../Menu';
import LanguageOptions from './LanguageOptions';

jest.mock('@edx/frontend-platform/auth', () => ({
  getAuthenticatedHttpClient: jest.fn(),
}));

// The real module is kept for useIntl, IntlProvider and LOCALE_CHANGED; only the two
// side-effecting functions and the locale reader are stubbed.
jest.mock('@edx/frontend-platform/i18n', () => ({
  ...jest.requireActual('@edx/frontend-platform/i18n'),
  getLocale: jest.fn(() => 'en'),
  handleRtl: jest.fn(),
}));

jest.mock('@edx/frontend-platform', () => ({
  ...jest.requireActual('@edx/frontend-platform'),
  publish: jest.fn(),
}));

// The logging service is not configured in this suite, and logError would throw.
jest.mock('@edx/frontend-platform/logging', () => ({
  logError: jest.fn(),
}));

const COOKIE = 'openedx-language-preference';
const LMS_BASE_URL = 'http://localhost:18000';

const config = { LMS_BASE_URL, LANGUAGE_PREFERENCE_COOKIE_NAME: COOKIE };
const user = { userId: 'abc123', username: 'edX', roles: [] };

let post;
let patch;

// The component reads the platform config, not the one on AppContext.
const setReleasedLanguages = (languages) => mergeConfig({ RELEASED_LANGUAGES: languages });

const renderOptions = ({ authenticatedUser = null, withMenu = false } = {}) => {
  const options = <LanguageOptions />;
  return render(
    <IntlProvider locale="en" messages={{}}>
      <AppContext.Provider value={{ authenticatedUser, config }}>
        {withMenu ? (
          <Menu>
            <MenuTrigger tag="button" type="button">menu</MenuTrigger>
            <MenuContent>{options}</MenuContent>
          </Menu>
        ) : options}
      </AppContext.Provider>
    </IntlProvider>,
  );
};

const openMenu = () => fireEvent.click(screen.getByRole('button', { name: 'menu' }));
const rowFor = (name) => screen.getByRole('menuitemradio', { name });

beforeEach(() => {
  post = jest.fn().mockResolvedValue({});
  patch = jest.fn().mockResolvedValue({});
  getAuthenticatedHttpClient.mockReturnValue({ post, patch });
  mergeConfig({ ...config, RELEASED_LANGUAGES: [{ code: 'en' }, { code: 'fr' }, { code: 'bo' }] });
});

afterEach(() => {
  // Both the config and the cookie are global singletons that would otherwise leak
  // into the other suites in this package.
  setReleasedLanguages(undefined);
  document.cookie = `${COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  jest.clearAllMocks();
});

describe('LanguageOptions', () => {
  it('lists the languages the platform says are released, by native name', () => {
    renderOptions();

    const rows = screen.getAllByRole('menuitemradio');
    expect(rows.map((row) => row.textContent)).toEqual(['English', 'Français', 'བོད་ཡིག']);
  });

  it('falls back to the built-in list when the platform sends none', () => {
    setReleasedLanguages(undefined);
    renderOptions();

    expect(screen.getAllByRole('menuitemradio').length).toBeGreaterThan(0);
    expect(rowFor('བོད་ཡིག')).toBeInTheDocument();
  });

  // The cookie is what the visitor asked for; intl.locale is only what this app can render.
  it('ticks the language stored in the cookie, not the rendered locale', () => {
    document.cookie = `${COOKIE}=fr`;
    renderOptions();

    expect(rowFor('Français')).toHaveAttribute('aria-checked', 'true');
    expect(rowFor('English')).toHaveAttribute('aria-checked', 'false');
  });

  it('falls back to the rendered locale when no preference is stored', () => {
    renderOptions();

    expect(rowFor('English')).toHaveAttribute('aria-checked', 'true');
  });

  it('switches the language for a signed-out visitor without touching preferences', async () => {
    renderOptions();

    fireEvent.click(rowFor('Français'));

    await waitFor(() => expect(post).toHaveBeenCalledTimes(1));
    expect(patch).not.toHaveBeenCalled();

    const [url, formData, requestConfig] = post.mock.calls[0];
    expect(url).toBe(`${LMS_BASE_URL}/i18n/setlang/`);
    expect(formData.get('language')).toBe('fr');
    // Anonymous visitors have no JWT to refresh, but the POST still needs its CSRF token.
    expect(requestConfig.isPublic).toBe(true);

    expect(publish).toHaveBeenCalled();
    expect(handleRtl).toHaveBeenCalled();
  });

  it('saves the preference before switching, when signed in', async () => {
    renderOptions({ authenticatedUser: user });

    fireEvent.click(rowFor('Français'));

    await waitFor(() => expect(post).toHaveBeenCalledTimes(1));
    expect(patch).toHaveBeenCalledWith(
      `${LMS_BASE_URL}/api/user/v1/preferences/${user.username}`,
      { 'pref-lang': 'fr' },
      expect.anything(),
    );
    expect(patch.mock.invocationCallOrder[0]).toBeLessThan(post.mock.invocationCallOrder[0]);
  });

  // Losing the cross-device preference should not cost the visitor the language switch.
  it('still switches when saving the preference fails', async () => {
    patch.mockRejectedValue(new Error('nope'));
    renderOptions({ authenticatedUser: user });

    fireEvent.click(rowFor('Français'));

    await waitFor(() => expect(post).toHaveBeenCalledTimes(1));
    expect(publish).toHaveBeenCalled();
  });

  it('changes nothing when the switch itself fails', async () => {
    post.mockRejectedValue(new Error('nope'));
    renderOptions();

    fireEvent.click(rowFor('Français'));

    await waitFor(() => expect(post).toHaveBeenCalledTimes(1));
    expect(publish).not.toHaveBeenCalled();
    expect(handleRtl).not.toHaveBeenCalled();
    expect(rowFor('Français')).toHaveAttribute('aria-checked', 'false');
  });

  it('ignores a second click while a switch is in flight', async () => {
    let release;
    post.mockReturnValue(new Promise((resolve) => { release = resolve; }));
    renderOptions();

    fireEvent.click(rowFor('Français'));
    fireEvent.click(rowFor('བོད་ཡིག'));

    await waitFor(() => expect(rowFor('Français')).toBeDisabled());
    expect(post).toHaveBeenCalledTimes(1);

    release({});
    await waitFor(() => expect(rowFor('Français')).not.toBeDisabled());
  });

  it('does not call the platform when the current language is chosen again', () => {
    renderOptions();

    fireEvent.click(rowFor('English'));

    expect(post).not.toHaveBeenCalled();
    expect(patch).not.toHaveBeenCalled();
  });

  it('moves the tick to the chosen language', async () => {
    renderOptions();

    fireEvent.click(rowFor('Français'));

    await waitFor(() => expect(rowFor('Français')).toHaveAttribute('aria-checked', 'true'));
    expect(rowFor('English')).toHaveAttribute('aria-checked', 'false');
  });

  it('closes the menu it lives in once the language has changed', async () => {
    renderOptions({ withMenu: true });
    openMenu();

    fireEvent.click(rowFor('Français'));

    // The menu unmounts through a CSSTransition, so this settles a tick later.
    await waitFor(() => expect(screen.queryByRole('menuitemradio')).not.toBeInTheDocument());
  });

  it('works on its own, with no menu around it', async () => {
    renderOptions();

    fireEvent.click(rowFor('Français'));

    await waitFor(() => expect(post).toHaveBeenCalledTimes(1));
  });
});
