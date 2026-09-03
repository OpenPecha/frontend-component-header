import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import SiteLoggedOutItems, { siteLoggedOutItemsDataShape } from '../../site-header/SiteLoggedOutItems';

const LearningLoggedOutItemsSlot = ({
  buttonsInfo,
}) => (
  <PluginSlot
    id="org.openedx.frontend.layout.header_learning_logged_out_items.v1"
    idAliases={['learning_logged_out_items_slot']}
    slotOptions={{
      mergeProps: true,
    }}
  >
    <SiteLoggedOutItems items={buttonsInfo} />
  </PluginSlot>
);

LearningLoggedOutItemsSlot.propTypes = {
  buttonsInfo: siteLoggedOutItemsDataShape,
};

LearningLoggedOutItemsSlot.defaultProps = {
  buttonsInfo: [],
};

export default LearningLoggedOutItemsSlot;
