import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import MobileHeader, { mobileHeaderDataShape } from '../../mobile-header/MobileHeader';
const MobileHeaderSlot = _ref => {
  let {
    props
  } = _ref;
  return /*#__PURE__*/React.createElement(PluginSlot, {
    id: "mobile_header_slot",
    slotOptions: {
      mergeProps: true
    }
  }, /*#__PURE__*/React.createElement(MobileHeader, props));
};
MobileHeaderSlot.propTypes = mobileHeaderDataShape;
export default MobileHeaderSlot;
//# sourceMappingURL=index.js.map