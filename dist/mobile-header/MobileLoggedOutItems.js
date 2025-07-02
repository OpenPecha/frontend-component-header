import React from 'react';
import PropTypes from 'prop-types';
const MobileLoggedOutItems = _ref => {
  let {
    items
  } = _ref;
  return items.map((_ref2, i, arr) => {
    let {
      type,
      href,
      content
    } = _ref2;
    return /*#__PURE__*/React.createElement("li", {
      className: "nav-item px-3 my-2",
      key: `${type}-${content}`
    }, /*#__PURE__*/React.createElement("a", {
      className: i < arr.length - 1 ? 'btn btn-block btn-outline-primary' : 'btn btn-block btn-primary',
      href: href
    }, content));
  });
};
export const mobileHeaderLoggedOutItemsDataShape = PropTypes.arrayOf(PropTypes.shape({
  type: PropTypes.oneOf(['item', 'menu']),
  href: PropTypes.string,
  content: PropTypes.string
}));
MobileLoggedOutItems.propTypes = {
  menu: mobileHeaderLoggedOutItemsDataShape
};
export default MobileLoggedOutItems;
//# sourceMappingURL=MobileLoggedOutItems.js.map