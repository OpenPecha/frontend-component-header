import React from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { Dropdown } from '@openedx/paragon';
var LearningHeaderUserMenuItems = function LearningHeaderUserMenuItems(_ref) {
  var items = _ref.items;
  return items.map(function (item, index) {
    var isSignOut = item.href === getConfig().LOGOUT_URL;
    return /*#__PURE__*/React.createElement(Dropdown.Item, {
      key: "menu-item-".concat(index),
      href: item.href,
      className: isSignOut ? 'sign-out-item' : ''
    }, item.message);
  });
};
export var learningHeaderUserMenuDataShape = {
  items: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    href: PropTypes.string
  }))
};
LearningHeaderUserMenuItems.propTypes = learningHeaderUserMenuDataShape;
export default LearningHeaderUserMenuItems;
//# sourceMappingURL=LearningHeaderUserMenuItems.js.map