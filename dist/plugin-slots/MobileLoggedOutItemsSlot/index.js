import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import MobileLoggedOutItems, { mobileHeaderLoggedOutItemsDataShape } from '../../mobile-header/MobileLoggedOutItems';
const MobileLoggedOutItemsSlot = _ref => {
  let {
    items
  } = _ref;
  return /*#__PURE__*/React.createElement(PluginSlot, {
    id: "mobile_logged_out_items_slot",
    slotOptions: {
      mergeProps: true
    }
  }, /*#__PURE__*/React.createElement(MobileLoggedOutItems, {
    items: items
  }));
};
MobileLoggedOutItemsSlot.propTypes = {
  items: mobileHeaderLoggedOutItemsDataShape
};
export default MobileLoggedOutItemsSlot;
//# sourceMappingURL=index.js.map