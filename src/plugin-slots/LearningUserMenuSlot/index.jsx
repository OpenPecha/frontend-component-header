import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import UserMenuItems, { userMenuItemsDataShape } from '../../site-header/UserMenuItems';

const LearningUserMenuSlot = ({
  items,
}) => (
  <PluginSlot
    id="org.openedx.frontend.layout.header_learning_user_menu.v1"
    idAliases={['learning_user_menu_slot']}
    slotOptions={{
      mergeProps: true,
    }}
  >
    <UserMenuItems menu={items} leadingSeparator />
  </PluginSlot>
);

LearningUserMenuSlot.propTypes = {
  items: userMenuItemsDataShape,
};

LearningUserMenuSlot.defaultProps = {
  items: [],
};

export default LearningUserMenuSlot;
