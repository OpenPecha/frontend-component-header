import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import MobileHeader, { mobileHeaderDataShape } from '../../mobile-header/MobileHeader';
const MobileHeaderSlot = ({
  props
}) => /*#__PURE__*/React.createElement(PluginSlot, {
  id: "org.openedx.frontend.layout.header_mobile.v1",
  idAliases: ['mobile_header_slot'],
  slotOptions: {
    mergeProps: true
  }
}, /*#__PURE__*/React.createElement(MobileHeader, props));
MobileHeaderSlot.propTypes = mobileHeaderDataShape;
export default MobileHeaderSlot;
//# sourceMappingURL=index.js.map