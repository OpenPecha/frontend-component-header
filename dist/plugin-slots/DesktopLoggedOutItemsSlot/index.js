import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import DesktopLoggedOutItems, { desktopLoggedOutItemsDataShape } from '../../desktop-header/DesktopLoggedOutItems';
const DesktopLoggedOutItemsSlot = _ref => {
  let {
    items
  } = _ref;
  return /*#__PURE__*/React.createElement(PluginSlot, {
    id: "desktop_logged_out_items_slot",
    slotOptions: {
      mergeProps: true
    }
  }, /*#__PURE__*/React.createElement(DesktopLoggedOutItems, {
    items: items
  }));
};
DesktopLoggedOutItemsSlot.propTypes = {
  items: desktopLoggedOutItemsDataShape
};
export default DesktopLoggedOutItemsSlot;
//# sourceMappingURL=index.js.map