import React from 'react';
import PropTypes from 'prop-types';
const DesktopHeaderUserMenu = ({
  menu
}) => menu.map((group, index) =>
/*#__PURE__*/
// eslint-disable-next-line react/jsx-no-comment-textnodes,react/no-array-index-key
React.createElement(React.Fragment, {
  key: index
}, group.heading && /*#__PURE__*/React.createElement("div", {
  className: "dropdown-header",
  role: "heading",
  "aria-level": "1"
}, group.heading), group.items.map(({
  type,
  content,
  href,
  disabled,
  isActive,
  onClick
}) => /*#__PURE__*/React.createElement("a", {
  className: `dropdown-${type}${isActive ? ' active' : ''}${disabled ? ' disabled' : ''}`,
  key: `${type}-${content}`,
  href: href,
  onClick: onClick || null
}, content)), index < menu.length - 1 && /*#__PURE__*/React.createElement("div", {
  className: "dropdown-divider",
  role: "separator"
})));
export const desktopUserMenuDataShape = PropTypes.arrayOf(PropTypes.shape({
  heading: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['item', 'menu']),
    href: PropTypes.string,
    content: PropTypes.string,
    isActive: PropTypes.bool,
    onClick: PropTypes.func
  }))
}));
DesktopHeaderUserMenu.propTypes = {
  menu: desktopUserMenuDataShape
};
export default DesktopHeaderUserMenu;
//# sourceMappingURL=DesktopHeaderUserMenu.js.map