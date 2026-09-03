/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import { render as rtlRender } from '@testing-library/react';
import {
  authenticatedUser, fireEvent, initializeMockApp, render, screen,
} from '../setupTest';
import { LearningHeader as Header } from '../index';

/**
 * Renders as a signed-out visitor. The shared `render` helper always provides the
 * mock authenticated user, so the logged-out half of the header needs its own
 * AppContext rather than that helper.
 */
const renderLoggedOut = (ui) => {
  const context = { authenticatedUser: null, config: getConfig() };
  const Wrapper = ({ children }) => (
    <IntlProvider locale="en">
      <AppContext.Provider value={context}>
        {children}
      </AppContext.Provider>
    </IntlProvider>
  );
  Wrapper.propTypes = { children: PropTypes.node.isRequired };
  return rtlRender(ui, { wrapper: Wrapper });
};

describe('Header', () => {
  beforeAll(async () => {
    // We need to mock AuthService to implicitly use `getAuthenticatedUser` within `AppContext.Provider`.
    await initializeMockApp();
  });

  beforeEach(() => {
    // The account fetch behind the avatar. Answered here so no test depends on a
    // real request, and so the name and email reach the identity block.
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        name: 'Mock Name',
        email: 'mock@example.com',
        profile_image: { has_image: false, image_url_large: null },
      }),
    }));
  });

  it('displays the account menu trigger', async () => {
    render(<Header />);
    // The username labels the avatar button; it is no longer visible text in the
    // bar itself, so the accessible name is what identifies it.
    expect(await screen.findByRole('button', { name: new RegExp(authenticatedUser.username) }))
      .toBeInTheDocument();
  });

  it('displays course data', async () => {
    const courseData = {
      courseOrg: 'course-org',
      courseNumber: 'course-number',
      courseTitle: 'course-title',
    };
    const { container } = render(<Header {...courseData} />);

    expect(await screen.findByText(courseData.courseTitle)).toBeInTheDocument();
    expect(container.querySelector('header.site-nav.site-nav-learning')).toBeInTheDocument();
  });

  it('shows the account rows once the menu is opened', async () => {
    render(<Header />);
    const trigger = await screen.findByRole('button', { name: new RegExp(authenticatedUser.username) });

    // The menu content is unmounted while closed, so nothing is asserted before this.
    fireEvent.click(trigger);

    expect(screen.getByText('Mock Name')).toBeInTheDocument();
    expect(screen.getByText('mock@example.com')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();

    const signOut = screen.getByText('Sign Out').closest('a');
    expect(signOut).toHaveClass('nav-menu-signout');
    expect(signOut).toHaveAttribute('href', getConfig().LOGOUT_URL);
  });

  it('offers the language menu', async () => {
    const { container } = render(<Header />);
    await screen.findByRole('button', { name: new RegExp(authenticatedUser.username) });

    expect(container.querySelector('.nav-locale')).toBeInTheDocument();
  });

  it('renders no controls when the user dropdown is suppressed', async () => {
    const { container } = render(<Header showUserDropdown={false} courseTitle="course-title" />);

    expect(await screen.findByText('course-title')).toBeInTheDocument();
    expect(container.querySelector('.nav-actions')).not.toBeInTheDocument();
    expect(container.querySelector('.nav-locale')).not.toBeInTheDocument();
    expect(container.querySelector('.nav-profile')).not.toBeInTheDocument();
  });

  it('offers register and sign in when logged out', () => {
    const { container } = renderLoggedOut(<Header />);

    const register = container.querySelector('.nav-auth-register');
    const signIn = container.querySelector('.nav-auth-signin');

    expect(register).toHaveTextContent('Register');
    expect(signIn).toHaveTextContent('Sign in');
    // Both send the visitor back where they were once they are done.
    expect(register.getAttribute('href')).toContain(encodeURIComponent(global.location.href));
    expect(signIn.getAttribute('href')).toContain(encodeURIComponent(global.location.href));
    expect(container.querySelector('.nav-profile')).not.toBeInTheDocument();
  });
});
