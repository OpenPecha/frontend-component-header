import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';

import LanguageMenu from './LanguageMenu';
import ProfileMenu from './ProfileMenu';
import MobileNavMenu from './MobileNavMenu';
import { userMenuItemsDataShape } from './UserMenuItems';
import SiteNavLinks, { siteNavLinksDataShape } from './SiteNavLinks';
import SiteLoggedOutItems, { siteLoggedOutItemsDataShape } from './SiteLoggedOutItems';
import useReleaseNearFooter from './useReleaseNearFooter';
import messages from '../Header.messages';

/**
 * Is the visitor on the site's own landing page? Used only to underline the brand
 * lockup, so a missing window (server render, some test environments) simply means
 * "no marker" rather than an error.
 */
const isLandingPage = () => typeof window !== 'undefined' && window.location.pathname === '/';

/**
 * The site header, in one component for every screen width.
 *
 * CSS decides what is visible: above the collapse breakpoint the navigation links,
 * locale button and profile avatar show and the burger is hidden; below it the
 * reverse. That means the breakpoint lives in `_header.scss` in the brand package,
 * and nothing here measures the window.
 *
 * Styling comes entirely from `@edx/brand/paragon/header`, which an application has
 * to import for this markup to look right.
 *
 * It also releases its own sticky position once the page's footer scrolls into
 * view, so it doesn't sit pinned on top of it - see `useReleaseNearFooter`. An
 * application doesn't need its own scroll-watching code for this; it's automatic
 * for any page that renders both this header and a footer matching `footerSelector`
 * (a plain `<footer>` tag by default). An application with more than one such
 * element on the page, or none at all, can pass a more specific `footerSelector`.
 */
const SiteHeader = ({
  logo,
  logoAltText,
  logoDestination,
  siteName,
  mainMenu,
  secondaryMenu,
  userMenu,
  loggedOutItems,
  avatar,
  avatarLoading,
  username,
  name,
  email,
  loggedIn,
  footerSelector,
}) => {
  const intl = useIntl();
  const footerInView = useReleaseNearFooter(footerSelector);

  // The burger menu shows one merged list, so it needs the two menus concatenated
  // rather than passed through separately as the wide layout does. Each is checked
  // on its own: a consumer may hand us a ready-made node instead of a list, and a
  // node cannot be merged into an array - but that should only cost the burger menu
  // the menu that is a node, not the other one as well. The wide layout renders
  // either form, since each slot passes a node straight through.
  const navItems = [
    ...(Array.isArray(mainMenu) ? mainMenu : []),
    ...(Array.isArray(secondaryMenu) ? secondaryMenu : []),
  ];

  const brandActive = isLandingPage();
  const brandLabel = intl.formatMessage(
    messages['header.label.brand.home'],
    { siteName: siteName || logoAltText },
  );

  return (
    <header className={`site-nav${footerInView ? ' header-releases-sticky' : ''}`}>
      <a className="nav-skip sr-only sr-only-focusable" href="#main">
        {intl.formatMessage(messages['header.label.skip.nav'])}
      </a>

      <div className="nav-left">
        <a
          className={`nav-brand${brandActive ? ' nav-brand-active' : ''}`}
          href={logoDestination}
          aria-label={brandLabel}
          aria-current={brandActive ? 'page' : undefined}
        >
          {logo && <img className="nav-brand-logo" src={logo} alt="" width="32" height="32" />}
          <span className="nav-brand-name">{siteName || logoAltText}</span>
        </a>

        <nav
          className="nav-links"
          aria-label={intl.formatMessage(messages['header.label.main.nav'])}
        >
          <SiteNavLinks menu={mainMenu} />
          <SiteNavLinks menu={secondaryMenu} />
        </nav>
      </div>

      <div className="nav-actions">
        <LanguageMenu />
        {loggedIn ? (
          <ProfileMenu
            menu={userMenu}
            avatar={avatar}
            avatarLoading={avatarLoading}
            username={username}
            name={name}
            email={email}
          />
        ) : <SiteLoggedOutItems items={loggedOutItems} />}
        {/*
          Last, not first: below the collapse breakpoint everything else in
          this row is display:none, so the burger ends up the only visible
          control - on the right, where .nav-actions already sits.
        */}
        <MobileNavMenu
          navItems={navItems}
          userMenu={userMenu}
          loggedOutItems={loggedOutItems}
          loggedIn={loggedIn}
          avatar={avatar}
          avatarLoading={avatarLoading}
          username={username}
          name={name}
          email={email}
        />
      </div>
    </header>
  );
};

export const siteHeaderDataShape = {
  logo: PropTypes.string,
  logoAltText: PropTypes.string,
  logoDestination: PropTypes.string,
  siteName: PropTypes.string,
  mainMenu: siteNavLinksDataShape,
  secondaryMenu: siteNavLinksDataShape,
  userMenu: userMenuItemsDataShape,
  loggedOutItems: siteLoggedOutItemsDataShape,
  avatar: PropTypes.string,
  avatarLoading: PropTypes.bool,
  username: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  loggedIn: PropTypes.bool,
  footerSelector: PropTypes.string,
};

SiteHeader.propTypes = siteHeaderDataShape;

SiteHeader.defaultProps = {
  logo: null,
  logoAltText: null,
  logoDestination: null,
  siteName: null,
  mainMenu: [],
  secondaryMenu: [],
  userMenu: [],
  loggedOutItems: [],
  avatar: null,
  avatarLoading: false,
  username: null,
  name: null,
  email: null,
  loggedIn: false,
  footerSelector: 'footer',
};

export default SiteHeader;
