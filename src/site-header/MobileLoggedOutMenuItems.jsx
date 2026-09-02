import React from 'react';

import UserMenuItems from './UserMenuItems';
import { siteLoggedOutItemsDataShape } from './SiteLoggedOutItems';

/**
 * Sign in and register inside the burger menu, where they are menu rows rather
 * than the buttons the wide layout shows. Takes the flat `items` array the slot
 * documents and groups it for `UserMenuItems`, so a plugin modifying the slot can
 * write `items` without knowing about the grouped shape.
 */
const MobileLoggedOutMenuItems = ({ items }) => (
  <UserMenuItems menu={[{ items }]} leadingSeparator />
);

MobileLoggedOutMenuItems.propTypes = {
  items: siteLoggedOutItemsDataShape,
};

MobileLoggedOutMenuItems.defaultProps = {
  items: [],
};

export default MobileLoggedOutMenuItems;
