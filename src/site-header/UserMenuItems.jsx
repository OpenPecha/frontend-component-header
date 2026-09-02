import React from 'react';
import PropTypes from 'prop-types';

import { NavIcon } from './icons';

/**
 * Flattens the grouped user menu into dropdown rows, putting a separator between
 * each group. Sign out is identified by its icon hint rather than its text, so the
 * distinct styling survives translation.
 */
const UserMenuItems = ({ menu, leadingSeparator }) => menu.map((group, index) => (
  // eslint-disable-next-line react/no-array-index-key
  <React.Fragment key={`group-${index}`}>
    {(leadingSeparator || index > 0) && <div className="nav-menu-sep" role="separator" />}
    {group.heading && <div className="nav-menu-label">{group.heading}</div>}
    {group.items.map(({
      content, href, iconName, disabled, isActive, onClick,
    }) => (
      <a
        key={`${iconName || 'item'}-${content}`}
        className={`nav-menu-item${iconName === 'signout' ? ' nav-menu-signout' : ''}${disabled ? ' disabled' : ''}`}
        role="menuitem"
        href={href}
        aria-current={isActive ? 'page' : undefined}
        onClick={onClick || null}
      >
        <NavIcon iconName={iconName} />
        <span>{content}</span>
      </a>
    ))}
  </React.Fragment>
));

export const userMenuItemsDataShape = PropTypes.arrayOf(PropTypes.shape({
  heading: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['item', 'menu']),
    href: PropTypes.string,
    content: PropTypes.string,
    iconName: PropTypes.string,
    isActive: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
  })),
}));

UserMenuItems.propTypes = {
  menu: userMenuItemsDataShape,
  leadingSeparator: PropTypes.bool,
};

UserMenuItems.defaultProps = {
  menu: [],
  leadingSeparator: false,
};

export default UserMenuItems;
