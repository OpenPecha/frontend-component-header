import React from 'react';
import PropTypes from 'prop-types';

import { NavIcon } from './icons';

/**
 * The navigation rows at the top of the burger menu. Receives the main and
 * secondary menus already merged, since below the collapse breakpoint they are
 * one list rather than two.
 *
 * Each row may carry an `iconName` hint, which `NavIcon` resolves to a glyph. It
 * is a name rather than a component so the applications supplying menu items need
 * no import from this package; an unknown or absent name renders no icon, which is
 * what the wide layout's plain text links rely on.
 */
const MobileNavItems = ({ menu }) => {
  // Consumers may hand us a ready-made node instead of a list of items.
  if (!Array.isArray(menu)) {
    return menu;
  }

  return menu.map(({
    content, href, iconName, isActive, onClick,
  }) => (
    <a
      key={`nav-${content}`}
      className="nav-menu-item"
      role="menuitem"
      href={href}
      aria-current={isActive ? 'page' : undefined}
      onClick={onClick || null}
    >
      <NavIcon iconName={iconName} />
      <span>{content}</span>
    </a>
  ));
};

export const mobileNavItemsDataShape = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.array,
]);

MobileNavItems.propTypes = {
  menu: mobileNavItemsDataShape,
};

MobileNavItems.defaultProps = {
  menu: [],
};

export default MobileNavItems;
