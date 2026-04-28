import React from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { Dropdown } from '@openedx/paragon';
const LearningHeaderUserMenuItems = ({
  items
}) => items.flatMap((item, index) => {
  const isSignOut = item.href === getConfig().LOGOUT_URL;
  if (isSignOut) {
    return [/*#__PURE__*/React.createElement(Dropdown.Divider, {
      key: `menu-divider-${index}`
    }), /*#__PURE__*/React.createElement(Dropdown.Item, {
      key: `menu-item-${index}`,
      href: item.href,
      className: "sign-out-item"
    }, item.message)];
  }
  return /*#__PURE__*/React.createElement(Dropdown.Item, {
    key: `menu-item-${index}`,
    href: item.href
  }, item.message);
});
export const learningHeaderUserMenuDataShape = {
  items: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    href: PropTypes.string
  }))
};
LearningHeaderUserMenuItems.propTypes = learningHeaderUserMenuDataShape;
export default LearningHeaderUserMenuItems;
//# sourceMappingURL=LearningHeaderUserMenuItems.js.map