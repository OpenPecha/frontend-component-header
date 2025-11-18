import React from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { Dropdown } from '@openedx/paragon';
const LearningHeaderUserMenuItems = _ref => {
  let {
    items
  } = _ref;
  return items.map((item, index) => {
    const isSignOut = item.href === getConfig().LOGOUT_URL;
    return /*#__PURE__*/React.createElement(Dropdown.Item, {
      key: `menu-item-${index}`,
      href: item.href,
      className: isSignOut ? 'sign-out-item' : ''
    }, item.message);
  });
};
export const learningHeaderUserMenuDataShape = {
  items: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    href: PropTypes.string
  }))
};
LearningHeaderUserMenuItems.propTypes = learningHeaderUserMenuDataShape;
export default LearningHeaderUserMenuItems;
//# sourceMappingURL=LearningHeaderUserMenuItems.js.map