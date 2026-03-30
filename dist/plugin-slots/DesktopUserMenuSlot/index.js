import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import DesktopHeaderUserMenu, { desktopUserMenuDataShape } from '../../desktop-header/DesktopHeaderUserMenu';
const DesktopUserMenuSlot = _ref => {
  let {
    menu
  } = _ref;
  return /*#__PURE__*/React.createElement(PluginSlot, {
    id: "org.openedx.frontend.layout.header_desktop_user_menu.v1",
    idAliases: ['desktop_user_menu_slot'],
    slotOptions: {
      mergeProps: true
    }
  }, /*#__PURE__*/React.createElement(DesktopHeaderUserMenu, {
    menu: menu
  }));
};
DesktopUserMenuSlot.propTypes = {
  menu: desktopUserMenuDataShape
};
export default DesktopUserMenuSlot;
//# sourceMappingURL=index.js.map