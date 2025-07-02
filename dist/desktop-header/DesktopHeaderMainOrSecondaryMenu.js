import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuTrigger, MenuContent } from '../Menu';
import { CaretIcon } from '../Icons';
const DesktopHeaderMainOrSecondaryMenu = _ref => {
  let {
    menu
  } = _ref;
  // Nodes are accepted as a prop
  if (!Array.isArray(menu)) {
    return menu;
  }
  return menu.map(menuItem => {
    const {
      type,
      href,
      content,
      submenuContent,
      disabled,
      isActive,
      onClick
    } = menuItem;
    if (type === 'item') {
      return /*#__PURE__*/React.createElement("a", {
        key: `${type}-${content}`,
        className: `nav-link${disabled ? ' disabled' : ''}${isActive ? ' active' : ''}`,
        href: href,
        onClick: onClick || null
      }, content);
    }
    return /*#__PURE__*/React.createElement(Menu, {
      key: `${type}-${content}`,
      tag: "div",
      className: "nav-item",
      respondToPointerEvents: true
    }, /*#__PURE__*/React.createElement(MenuTrigger, {
      onClick: onClick || null,
      tag: "a",
      className: "nav-link d-inline-flex align-items-center",
      href: href
    }, content, " ", /*#__PURE__*/React.createElement(CaretIcon, {
      role: "img",
      "aria-hidden": true,
      focusable: "false"
    })), /*#__PURE__*/React.createElement(MenuContent, {
      className: "pin-left pin-right shadow py-2"
    }, submenuContent));
  });
};
export const desktopHeaderMainOrSecondaryMenuDataShape = PropTypes.oneOfType([PropTypes.node, PropTypes.array]);
DesktopHeaderMainOrSecondaryMenu.propTypes = {
  menu: desktopHeaderMainOrSecondaryMenuDataShape
};
export default DesktopHeaderMainOrSecondaryMenu;
//# sourceMappingURL=DesktopHeaderMainOrSecondaryMenu.js.map