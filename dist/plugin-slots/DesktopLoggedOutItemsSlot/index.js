import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import DesktopLoggedOutItems, { desktopLoggedOutItemsDataShape } from '../../desktop-header/DesktopLoggedOutItems';
const DesktopLoggedOutItemsSlot = ({
  items
}) => /*#__PURE__*/React.createElement(PluginSlot, {
  id: "org.openedx.frontend.layout.header_desktop_logged_out_items.v1",
  idAliases: ['desktop_logged_out_items_slot'],
  slotOptions: {
    mergeProps: true
  }
}, /*#__PURE__*/React.createElement(DesktopLoggedOutItems, {
  items: items
}));
DesktopLoggedOutItemsSlot.propTypes = {
  items: desktopLoggedOutItemsDataShape
};
export default DesktopLoggedOutItemsSlot;
//# sourceMappingURL=index.js.map