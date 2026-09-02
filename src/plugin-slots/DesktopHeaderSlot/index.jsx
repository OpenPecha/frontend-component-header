import React from 'react';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import SiteHeader, { siteHeaderDataShape } from '../../site-header/SiteHeader';

const DesktopHeaderSlot = ({
  props,
}) => (
  <PluginSlot
    id="org.openedx.frontend.layout.header_desktop.v1"
    idAliases={['desktop_header_slot']}
    slotOptions={{
      mergeProps: true,
    }}
  >
    <SiteHeader {...props} />
  </PluginSlot>
);

DesktopHeaderSlot.propTypes = siteHeaderDataShape;

export default DesktopHeaderSlot;
