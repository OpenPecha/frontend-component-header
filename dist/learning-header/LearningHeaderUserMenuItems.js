import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from '@openedx/paragon';
const LearningHeaderUserMenuItems = _ref => {
  let {
    items
  } = _ref;
  return items.map(item => /*#__PURE__*/React.createElement(Dropdown.Item, {
    href: item.href
  }, item.message));
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