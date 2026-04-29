import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import DesktopUserMenuToggle, { DesktopUserMenuTogglePropTypes } from '../../desktop-header/DesktopUserMenuToggle';
const DesktopUserMenuToggleSlot = ({
  avatar,
  label
}) => /*#__PURE__*/React.createElement(PluginSlot, {
  id: "org.openedx.frontend.layout.header_desktop_user_menu_toggle.v1",
  slotOptions: {
    mergeProps: true
  }
}, /*#__PURE__*/React.createElement(DesktopUserMenuToggle, {
  avatar: avatar,
  label: label
}));
DesktopUserMenuToggleSlot.propTypes = DesktopUserMenuTogglePropTypes;
export default DesktopUserMenuToggleSlot;
//# sourceMappingURL=index.js.map