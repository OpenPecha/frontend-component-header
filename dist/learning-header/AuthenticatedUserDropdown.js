import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import { Dropdown } from '@openedx/paragon';
import Avatar from '../Avatar';
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
    as: "button",
    bsPrefix: "custom-dropdown-toggle",
    className: "border-0 bg-transparent d-inline-flex align-items-center px-3 py-2",
    style: {
      color: '#093055'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    size: "1.9rem",
    src: avatar,
    alt: "",
    className: "mr-2",
    loading: loading
  }), /*#__PURE__*/React.createElement("span", {
    "data-hj-suppress": true,
    className: "d-none d-md-inline"
  }, username), /*#__PURE__*/React.createElement(CaretIcon, {
    role: "img",
    "aria-hidden": true,
    focusable: "false",
    className: "ml-1"
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