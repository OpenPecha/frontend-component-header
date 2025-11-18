import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuTrigger, MenuContent } from '../Menu';
const MobileHeaderMainMenu = _ref => {
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
      className: "nav-item"
    }, /*#__PURE__*/React.createElement(MenuTrigger, {
      onClick: onClick || null,
      tag: "a",
      role: "button",
      tabIndex: "0",
      className: "nav-link"
    }, content), /*#__PURE__*/React.createElement(MenuContent, {
      className: "position-static pin-left pin-right py-2"
    }, submenuContent));
  });
};
export const mobileHeaderMainMenuDataShape = PropTypes.oneOfType([PropTypes.node, PropTypes.array]);
MobileHeaderMainMenu.propTypes = {
  menu: mobileHeaderMainMenuDataShape
};
export default MobileHeaderMainMenu;
//# sourceMappingURL=MobileHeaderMainMenu.js.map