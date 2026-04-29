import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import LearningUserMenuToggle, { LearningUserMenuTogglePropTypes } from '../../learning-header/LearningUserMenuToggle';
const LearningUserMenuToggleSlot = ({
  label,
  icon
}) => /*#__PURE__*/React.createElement(PluginSlot, {
  id: "org.openedx.frontend.layout.header_learning_user_menu_toggle.v1",
  slotOptions: {
    mergeProps: true
  }
}, /*#__PURE__*/React.createElement(LearningUserMenuToggle, {
  label: label,
  icon: icon
}));
LearningUserMenuToggleSlot.propTypes = LearningUserMenuTogglePropTypes;
export default LearningUserMenuToggleSlot;
//# sourceMappingURL=index.js.map