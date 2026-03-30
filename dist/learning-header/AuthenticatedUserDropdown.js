import React from 'react';
import PropTypes from 'prop-types';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Dropdown } from '@openedx/paragon';
import LearningUserMenuToggleSlot from '../plugin-slots/LearningUserMenuToggleSlot';
import LearningUserMenuSlot from '../plugin-slots/LearningUserMenuSlot';
import { CaretIcon } from '../Icons';
import messages from './messages';
const AuthenticatedUserDropdown = _ref => {
  let {
    intl,
    username,
    avatar,
    loading = false
  } = _ref;
  const dropdownItems = [{
    message: intl.formatMessage(messages.dashboard),
    href: `${getConfig().LMS_BASE_URL}/dashboard`
  }, {
    message: intl.formatMessage(messages.profile),
    href: `${getConfig().ACCOUNT_PROFILE_URL}/u/${username}`
  }, {
    message: intl.formatMessage(messages.account),
    href: getConfig().ACCOUNT_SETTINGS_URL
  },
  // Order History link removed
  // Uncomment the following lines if you want to re-enable Order History
  // ...(getConfig().ORDER_HISTORY_URL ? [{
  //   message: intl.formatMessage(messages.orderHistory),
  //   href: getConfig().ORDER_HISTORY_URL,
  // }] : []),
  {
    message: intl.formatMessage(messages.signOut),
    href: getConfig().LOGOUT_URL
  }];
  return /*#__PURE__*/React.createElement(Dropdown, {
    className: "user-dropdown ml-3"
  }, /*#__PURE__*/React.createElement(Dropdown.Toggle, {
    variant: "outline-primary",
    "aria-label": intl.formatMessage(messages.userOptionsDropdownLabel)
  }, /*#__PURE__*/React.createElement(LearningUserMenuToggleSlot, {
    label: username,
    icon: faUserCircle,
    avatar: avatar,
    loading: loading
  })), /*#__PURE__*/React.createElement(Dropdown.Menu, {
    className: "dropdown-menu-right user-dropdown-menu"
  }, /*#__PURE__*/React.createElement(LearningUserMenuSlot, {
    items: dropdownItems
  })));
};
AuthenticatedUserDropdown.propTypes = {
  intl: intlShape.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  loading: PropTypes.bool
};
AuthenticatedUserDropdown.defaultProps = {
  avatar: null,
  loading: false
};
export default injectIntl(AuthenticatedUserDropdown);
//# sourceMappingURL=AuthenticatedUserDropdown.js.map