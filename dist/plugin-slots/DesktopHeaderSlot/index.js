import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import DesktopHeader, { desktopHeaderDataShape } from '../../desktop-header/DesktopHeader';
const DesktopHeaderSlot = _ref => {
  let {
    props
  } = _ref;
  return /*#__PURE__*/React.createElement(PluginSlot, {
    id: "desktop_header_slot",
    slotOptions: {
      mergeProps: true
    }
  }, /*#__PURE__*/React.createElement(DesktopHeader, props));
};
DesktopHeaderSlot.propTypes = desktopHeaderDataShape;
export default DesktopHeaderSlot;
//# sourceMappingURL=index.js.map