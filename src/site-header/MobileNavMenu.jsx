import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';

import { Menu, MenuTrigger, MenuContent } from '../Menu';
import { BurgerIcon } from './icons';
import LanguageOptions from './LanguageOptions';
import ProfileIdentity from './ProfileIdentity';
import UserMenuItems, { userMenuItemsDataShape } from './UserMenuItems';
import MobileNavItems, { mobileNavItemsDataShape } from './MobileNavItems';
import MobileLoggedOutMenuItems from './MobileLoggedOutMenuItems';
import { siteLoggedOutItemsDataShape } from './SiteLoggedOutItems';
import getInitials from './utils';
import messages from '../Header.messages';

/**
 * The burger button and the single menu that replaces the whole right-hand side
 * below the collapse breakpoint: navigation links, then the language list, then
 * the account rows. One merged menu rather than the two separate ones the old
 * mobile header used.
 *
 * `renderItems` overrides how the logged-in rows are drawn, the same escape
 * hatch `ProfileMenu` offers for the wide layout - the learning header uses
 * both to route its account rows through its own plugin slot at every width.
 * A caller that passes nothing gets the default rows.
 */
const MobileNavMenu = ({
  navItems, userMenu, loggedOutItems, loggedIn, avatar, avatarLoading, username, name, email,
  renderItems,
}) => {
  const intl = useIntl();
  const triggerId = useId();
  const label = intl.formatMessage(messages['header.label.main.menu']);

  return (
    <Menu className="nav-burger-wrap" transitionClassName="nav-menu-anim" transitionTimeout={160}>
      <MenuTrigger
        tag="button"
        type="button"
        id={triggerId}
        className="nav-locale nav-burger"
        aria-label={label}
        title={label}
      >
        <BurgerIcon />
      </MenuTrigger>
      <MenuContent className="nav-menu nav-menu-main" role="menu" aria-labelledby={triggerId}>
        <MobileNavItems menu={navItems} />

        <div className="nav-menu-sep" role="separator" />
        <LanguageOptions />

        {loggedIn ? (
          <>
            <div className="nav-menu-sep" role="separator" />
            <ProfileIdentity
              name={name}
              email={email}
              username={username}
              avatar={avatar}
              avatarLoading={avatarLoading}
              initials={getInitials(name, username)}
            />
            {renderItems ? renderItems(userMenu) : <UserMenuItems menu={userMenu} />}
          </>
        ) : (
          <MobileLoggedOutMenuItems items={loggedOutItems} />
        )}
      </MenuContent>
    </Menu>
  );
};

MobileNavMenu.propTypes = {
  navItems: mobileNavItemsDataShape,
  userMenu: userMenuItemsDataShape,
  loggedOutItems: siteLoggedOutItemsDataShape,
  loggedIn: PropTypes.bool,
  avatar: PropTypes.string,
  avatarLoading: PropTypes.bool,
  username: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  renderItems: PropTypes.func,
};

MobileNavMenu.defaultProps = {
  navItems: [],
  userMenu: [],
  loggedOutItems: [],
  loggedIn: false,
  avatar: null,
  avatarLoading: false,
  username: null,
  name: null,
  email: null,
  renderItems: null,
};

export default MobileNavMenu;
