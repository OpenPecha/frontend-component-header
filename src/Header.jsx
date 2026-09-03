import React, { useContext, useState, useEffect } from 'react';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import {
  APP_CONFIG_INITIALIZED,
  ensureConfig,
  mergeConfig,
  getConfig,
  subscribe,
} from '@edx/frontend-platform';

import PropTypes from 'prop-types';
import DesktopHeaderSlot from './plugin-slots/DesktopHeaderSlot';
import UserbackWidget from './UserbackWidget';

import messages from './Header.messages';

ensureConfig([
  'LMS_BASE_URL',
  'LOGOUT_URL',
  'LOGIN_URL',
  'SITE_NAME',
  'LOGO_URL',
  'ORDER_HISTORY_URL',
], 'Header component');

subscribe(APP_CONFIG_INITIALIZED, () => {
  mergeConfig({
    AUTHN_MINIMAL_HEADER: !!process.env.AUTHN_MINIMAL_HEADER,
  }, 'Header additional config');
});

/**
 * Header component for the application.
 * Displays a header with the provided main menu, secondary menu, and user menu when the user is authenticated.
 * If any of the props (mainMenuItems, secondaryMenuItems, userMenuItems) are not provided, default
 * items are displayed.
 *
 * The header renders as a single bar at every screen width; the switch to a burger
 * menu on narrow screens is made in CSS, by `@edx/brand/paragon/header`. An
 * application must import that stylesheet for the header to look right.
 *
 * For more details on how to use this component, please refer to this document:
 * https://github.com/openedx/frontend-component-header/blob/master/docs/using_custom_header.rst
 *
 * @param {list} mainMenuItems - The list of main menu items to display.
 * See the documentation for the structure of main menu item.
 * @param {list} secondaryMenuItems - The list of secondary menu items to display.
 * See the documentation for the structure of secondary menu item.
 * @param {list} userMenuItems - The list of user menu items to display.
 * See the documentation for the structure of user menu item.
 * @param {string} footerSelector - A CSS selector for the element the header should
 * treat as the page's footer, so it knows when to release its sticky position. Only
 * needed if the page has more than one element matching the default (`footer`), or
 * none at all.
 */
const Header = ({
  intl, mainMenuItems, secondaryMenuItems, userMenuItems, footerSelector,
}) => {
  const { authenticatedUser, config } = useContext(AppContext);

  const defaultMainMenu = [
    {
      type: 'item',
      href: `${config.LMS_BASE_URL}/dashboard`,
      content: intl.formatMessage(messages['header.links.courses']),
      iconName: 'dashboard',
    },
  ];

  // `iconName` picks the leading glyph for a row. It is a hint, not a component, so
  // applications supplying their own menu items need no import from this package;
  // an unknown or absent name simply renders no icon. Sign out is identified by it
  // too, which keeps its distinct styling working in every language.
  const defaultUserMenu = authenticatedUser === null ? [] : [{
    heading: '',
    items: [
      {
        type: 'item',
        href: `${config.ACCOUNT_PROFILE_URL}/u/${authenticatedUser.username}`,
        content: intl.formatMessage(messages['header.user.menu.profile']),
        iconName: 'profile',
      },
      {
        type: 'item',
        href: config.ACCOUNT_SETTINGS_URL,
        content: intl.formatMessage(messages['header.user.menu.account.settings']),
        iconName: 'account',
      },
      // Order History link removed
      // Uncomment the following lines if you want to re-enable Order History
      // ...(config.ORDER_HISTORY_URL ? [{
      //   type: 'item',
      //   href: config.ORDER_HISTORY_URL,
      //   content: intl.formatMessage(messages['header.user.menu.order.history']),
      // }] : []),
    ],
  }, {
    heading: '',
    items: [
      {
        type: 'item',
        href: config.LOGOUT_URL,
        content: intl.formatMessage(messages['header.user.menu.logout']),
        iconName: 'signout',
      },
    ],
  }];

  const mainMenu = mainMenuItems || defaultMainMenu;
  const secondaryMenu = secondaryMenuItems || [];
  const userMenu = authenticatedUser === null ? [] : userMenuItems || defaultUserMenu;

  // Register comes first and sign in second, matching the design. `variant` says
  // which is the primary action rather than relying on that order.
  const loggedOutItems = [
    {
      type: 'item',
      href: `${config.LMS_BASE_URL}/register`,
      content: intl.formatMessage(messages['header.user.menu.register']),
      iconName: 'register',
      variant: 'register',
    },
    {
      type: 'item',
      href: config.LOGIN_URL,
      content: intl.formatMessage(messages['header.user.menu.login']),
      iconName: 'login',
      variant: 'signin',
    },
  ];

  const [account, setAccount] = useState({
    loading: true, avatar: null, name: null, email: null,
  });

  // Fetch the account's photo, name and email when the component mounts or
  // authenticatedUser changes. One request covers all three: the header shows the
  // photo (or initials derived from the name), and the account menu shows the name
  // and email together.
  useEffect(() => {
    const fetchAccount = async () => {
      // If the user is logged out, we are not loading, and there is nothing to show.
      if (authenticatedUser === null) {
        setAccount({
          loading: false, avatar: null, name: null, email: null,
        });
        return;
      }

      // If we don't have a username yet, remain in the loading state.
      if (!authenticatedUser?.username) {
        setAccount({
          loading: true, avatar: null, name: null, email: null,
        });
        return;
      }

      try {
        const baseUrl = config.LMS_BASE_URL || '';
        const apiUrl = `${baseUrl}/api/user/v1/accounts/${authenticatedUser.username}`;
        const response = await fetch(apiUrl, {
          credentials: 'include',
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          // 'large' (120px) rather than 'medium' (50px): the avatar renders at
          // 44px CSS, and a 50px source looks soft on any 2x+ display.
          const imageUrl = data.profile_image?.image_url_large;
          const hasImage = data.profile_image?.has_image;

          setAccount({
            loading: false,
            // Use the fetched image only if it exists and is not a default one,
            // otherwise fall back to initials or the generic icon.
            avatar: imageUrl && hasImage ? imageUrl : null,
            name: data.name || null,
            email: data.email || null,
          });
        } else {
          setAccount({
            loading: false, avatar: null, name: null, email: null,
          });
        }
      } catch (error) {
        setAccount({
          loading: false, avatar: null, name: null, email: null,
        });
      }
    };

    fetchAccount();
  }, [authenticatedUser, config.LMS_BASE_URL]);

  const props = {
    logo: config.LOGO_URL,
    logoAltText: config.SITE_NAME,
    logoDestination: `${config.LMS_BASE_URL}`,
    siteName: config.SITE_NAME,
    loggedIn: authenticatedUser !== null,
    username: authenticatedUser !== null ? authenticatedUser.username : null,
    name: account.name,
    email: account.email,
    avatar: account.avatar,
    avatarLoading: account.loading,
    mainMenu: getConfig().AUTHN_MINIMAL_HEADER ? [] : mainMenu,
    secondaryMenu: getConfig().AUTHN_MINIMAL_HEADER ? [] : secondaryMenu,
    userMenu: getConfig().AUTHN_MINIMAL_HEADER ? [] : userMenu,
    loggedOutItems: getConfig().AUTHN_MINIMAL_HEADER ? [] : loggedOutItems,
    footerSelector,
  };

  return (
    <>
      <DesktopHeaderSlot props={props} />
      <UserbackWidget />
    </>
  );
};

Header.defaultProps = {
  mainMenuItems: null,
  secondaryMenuItems: null,
  userMenuItems: null,
};

Header.propTypes = {
  intl: intlShape.isRequired,
  mainMenuItems: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
  secondaryMenuItems: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
  // No defaultProps entry: this must stay `undefined`, not `null`, when unset. A
  // prop object built with an explicit `footerSelector: null` still reaches
  // SiteHeader as `null` when spread, and React only falls back to a component's
  // own defaultProps for a genuinely `undefined` value - `null` would silently
  // override SiteHeader's default of 'footer' and break footer detection outright.
  footerSelector: PropTypes.string,
  userMenuItems: PropTypes.arrayOf(PropTypes.shape({
    heading: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf(['item', 'menu']),
      href: PropTypes.string,
      content: PropTypes.string,
      iconName: PropTypes.string,
      isActive: PropTypes.bool,
    })),
  })),
};

export default injectIntl(Header);
