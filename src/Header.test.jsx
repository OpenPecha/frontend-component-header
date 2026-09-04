/* eslint-disable react/prop-types */
import React from 'react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import {
  render, screen, fireEvent, waitFor, within,
} from '@testing-library/react';

import Header from './index';
import { FALLBACK_LANGUAGE_CODES } from './site-header/languages';

// Mocked to assert *what SiteHeader receives*, without needing a real footer
// element or scroll behavior in jsdom - the hook's own logic is covered by
// useReleaseNearFooter's own tests, this file only owns the prop threading.
jest.mock('./site-header/useReleaseNearFooter', () => jest.fn(() => ({ inView: false, instant: false })));
// eslint-disable-next-line import/first
import useReleaseNearFooter from './site-header/useReleaseNearFooter';

const config = {
  LMS_BASE_URL: process.env.LMS_BASE_URL,
  SITE_NAME: process.env.SITE_NAME,
  LOGIN_URL: process.env.LOGIN_URL,
  LOGOUT_URL: process.env.LOGOUT_URL,
  LOGO_URL: process.env.LOGO_URL,
  ACCOUNT_PROFILE_URL: process.env.ACCOUNT_PROFILE_URL,
  ACCOUNT_SETTINGS_URL: process.env.ACCOUNT_SETTINGS_URL,
};

const user = {
  userId: 'abc123',
  username: 'edX',
  roles: [],
  administrator: false,
};

const renderHeader = (authenticatedUser, headerProps = {}) => render(
  <IntlProvider locale="en" messages={{}}>
    <AppContext.Provider value={{ authenticatedUser, config }}>
      <Header {...headerProps} />
    </AppContext.Provider>
  </IntlProvider>,
);

// The header asks the accounts API for the photo, name and email on mount.
const mockAccount = (body) => {
  global.fetch = jest.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve(body),
  }));
};

describe('<Header />', () => {
  beforeEach(() => {
    mockAccount({ profile_image: { has_image: false } });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    delete global.fetch;
    useReleaseNearFooter.mockClear();
  });

  describe('signed out', () => {
    it('shows the brand lockup, linking the logo and wordmark to the site', async () => {
      renderHeader(null);

      const brand = await screen.findByRole('link', { name: /home/i });
      expect(brand).toHaveAttribute('href', config.LMS_BASE_URL);
      expect(brand).toHaveTextContent(config.SITE_NAME);
    });

    it('offers register as the outlined action and sign in as the filled one', async () => {
      renderHeader(null);

      const register = await screen.findByRole('link', { name: /register/i });
      const signIn = await screen.findByRole('link', { name: /sign in/i });

      expect(register).toHaveClass('nav-auth', 'nav-auth-register');
      expect(register).toHaveAttribute('href', `${config.LMS_BASE_URL}/register`);
      expect(signIn).toHaveClass('nav-auth', 'nav-auth-signin');
      expect(signIn).toHaveAttribute('href', config.LOGIN_URL);
    });

    it('does not offer an account menu', async () => {
      renderHeader(null);

      await screen.findByRole('link', { name: /home/i });
      expect(screen.queryByRole('button', { name: /account menu/i })).not.toBeInTheDocument();
    });
  });

  describe('signed in', () => {
    beforeEach(() => {
      mockAccount({
        name: 'Tenzin Dorjee',
        email: 'tenzin@example.test',
        profile_image: { has_image: false },
      });
    });

    it('shows the account initials on the avatar button', async () => {
      renderHeader(user);

      const trigger = await screen.findByRole('button', { name: /account menu for edX/i });
      await waitFor(() => expect(trigger).toHaveTextContent('TD'));
    });

    it('shows the name, email and a distinct sign out row once opened', async () => {
      renderHeader(user);

      const trigger = await screen.findByRole('button', { name: /account menu for edX/i });
      fireEvent.click(trigger);

      const menu = await screen.findByRole('menu');
      expect(within(menu).getByText('Tenzin Dorjee')).toBeInTheDocument();
      expect(within(menu).getByText('tenzin@example.test')).toBeInTheDocument();
      expect(within(menu).getByRole('menuitem', { name: /sign out/i }))
        .toHaveClass('nav-menu-signout');
    });

    it('does not offer the signed out actions', async () => {
      renderHeader(user);

      await screen.findByRole('button', { name: /account menu for edX/i });
      expect(screen.queryByRole('link', { name: /register/i })).not.toBeInTheDocument();
    });

    it('prefers the profile photo over initials when the account has one', async () => {
      mockAccount({
        name: 'Tenzin Dorjee',
        profile_image: { has_image: true, image_url_large: 'https://example.test/me.jpg' },
      });
      renderHeader(user);

      const trigger = await screen.findByRole('button', { name: /account menu for edX/i });
      await waitFor(() => {
        expect(within(trigger).getByRole('presentation', { hidden: true }))
          .toHaveAttribute('src', 'https://example.test/me.jpg');
      });
    });
  });

  describe('language menu', () => {
    // The list itself comes from the platform's released languages; with no config in
    // this suite the header falls back to its built-in codes. LanguageOptions.test.jsx
    // covers the list and the switching in detail.
    it('lists every language and marks the active one', async () => {
      renderHeader(null);

      fireEvent.click(await screen.findByRole('button', { name: /change language/i }));

      const options = await screen.findAllByRole('menuitemradio');
      expect(options).toHaveLength(FALLBACK_LANGUAGE_CODES.length);
      expect(screen.getByRole('menuitemradio', { name: 'English' }))
        .toHaveAttribute('aria-checked', 'true');
      expect(screen.getByRole('menuitemradio', { name: 'བོད་ཡིག' }))
        .toHaveAttribute('aria-checked', 'false');
    });
  });

  describe('footerSelector', () => {
    // Guards the exact regression an earlier round of fixes introduced without
    // a test: SiteHeader/useReleaseNearFooter support a footerSelector prop
    // for pointing the header at the right footer, but if Header itself ever
    // stops threading it through, no error is thrown - the header just
    // silently falls back to matching the first <footer> on the page. These
    // assert the wiring itself, not just that nothing crashes.
    it('passes a custom footerSelector all the way through to the hook', async () => {
      renderHeader(null, { footerSelector: 'footer.the-real-one' });

      await screen.findByRole('banner');
      expect(useReleaseNearFooter).toHaveBeenCalledWith('footer.the-real-one');
    });

    it('with no footerSelector prop, the default reaches the hook as "footer" - never as null', async () => {
      renderHeader(null);

      await screen.findByRole('banner');
      // SiteHeader's own default ('footer') must be what actually reaches the
      // hook. Header building its props object with an explicit
      // `footerSelector: null` would silently defeat that default - React
      // only falls back to a component's defaultProps for a genuinely
      // `undefined` prop, not `null` - so this is the one assertion standing
      // between that mistake and it going unnoticed again.
      expect(useReleaseNearFooter).toHaveBeenCalledWith('footer');
      expect(useReleaseNearFooter).not.toHaveBeenCalledWith(null);
    });
  });

  describe('one bar at every width', () => {
    it('renders a single header, with the burger menu alongside the wide-screen controls', async () => {
      renderHeader(user);

      await screen.findByRole('button', { name: /account menu for edX/i });

      // A single bar, not one per breakpoint: the switch to the burger is made in CSS.
      expect(screen.getAllByRole('banner')).toHaveLength(1);
      expect(screen.getByRole('button', { name: /main menu/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /change language/i })).toBeInTheDocument();
    });

    it('closes the open menu when the other one is opened', async () => {
      renderHeader(user);

      fireEvent.click(await screen.findByRole('button', { name: /change language/i }));
      expect(await screen.findByRole('menuitemradio', { name: 'English' })).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: /account menu for edX/i }));

      await waitFor(() => {
        expect(screen.queryByRole('menuitemradio', { name: 'English' })).not.toBeInTheDocument();
      });
    });
  });
});
