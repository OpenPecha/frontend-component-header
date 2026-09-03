import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';

import { Menu, MenuTrigger, MenuContent } from '../Menu';
import ProfileAvatar from './ProfileAvatar';
import ProfileIdentity from './ProfileIdentity';
import UserMenuItems, { userMenuItemsDataShape } from './UserMenuItems';
import getInitials from './utils';
import messages from '../Header.messages';

/**
 * The avatar button and account menu. Shown on wide screens only; the same rows
 * appear inside the burger menu below the collapse breakpoint.
 *
 * `renderItems` replaces how the rows themselves are drawn, leaving the trigger,
 * the identity block and all the menu wiring alone. The learning header uses it
 * to route the same rows through its own plugin slot; a caller that passes
 * nothing gets the default rows.
 */
const ProfileMenu = ({
  menu, avatar, avatarLoading, username, name, email, renderItems,
}) => {
  const intl = useIntl();
  const triggerId = useId();
  const initials = getInitials(name, username);
  const label = username
    ? intl.formatMessage(messages['header.label.account.menu.for'], { username })
    : intl.formatMessage(messages['header.label.account.menu']);

  return (
    <Menu className="nav-profile-wrap" transitionClassName="nav-menu-anim" transitionTimeout={160}>
      <MenuTrigger
        tag="button"
        type="button"
        id={triggerId}
        className="nav-profile"
        aria-label={label}
      >
        <ProfileAvatar src={avatar} initials={initials} loading={avatarLoading} />
      </MenuTrigger>
      <MenuContent className="nav-menu" role="menu" aria-labelledby={triggerId}>
        <ProfileIdentity
          name={name}
          email={email}
          username={username}
          avatar={avatar}
          avatarLoading={avatarLoading}
          initials={initials}
        />
        {renderItems ? renderItems(menu) : <UserMenuItems menu={menu} leadingSeparator />}
      </MenuContent>
    </Menu>
  );
};

ProfileMenu.propTypes = {
  menu: userMenuItemsDataShape,
  avatar: PropTypes.string,
  avatarLoading: PropTypes.bool,
  username: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  renderItems: PropTypes.func,
};

ProfileMenu.defaultProps = {
  menu: [],
  avatar: null,
  avatarLoading: false,
  username: null,
  name: null,
  email: null,
  renderItems: null,
};

export default ProfileMenu;
