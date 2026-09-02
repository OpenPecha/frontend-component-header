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
 */
const ProfileMenu = ({
  menu, avatar, avatarLoading, username, name, email,
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
        <UserMenuItems menu={menu} leadingSeparator />
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
};

ProfileMenu.defaultProps = {
  menu: [],
  avatar: null,
  avatarLoading: false,
  username: null,
  name: null,
  email: null,
};

export default ProfileMenu;
