import React from 'react';
import PropTypes from 'prop-types';

const MobileHeaderUserMenu = ({ menu }) => menu.map((group, index) => (
  <React.Fragment key={index}>
    {group.items.map(({
      type, content, href, disabled, isActive, onClick,
    }) => (
      <li className="nav-item" key={`${type}-${content}`}>
        <a
          className={`nav-link${isActive ? ' active' : ''}${disabled ? ' disabled' : ''}`}
          href={href}
          onClick={onClick || null}
        >
          {content}
        </a>
      </li>
    ))}
    {index < menu.length - 1 && <li className="dropdown-divider" role="separator" />}
  </React.Fragment>
));

export const mobileHeaderUserMenuDataShape = PropTypes.arrayOf(PropTypes.shape({
  heading: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['item', 'menu']),
    href: PropTypes.string,
    content: PropTypes.string,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
  })),
}));

MobileHeaderUserMenu.propTypes = {
  menu: mobileHeaderUserMenuDataShape,
};

export default MobileHeaderUserMenu;
