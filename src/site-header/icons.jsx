import React from 'react';
import PropTypes from 'prop-types';

/**
 * Shared wrapper for the header's line glyphs. They all share a 24x24 viewBox and
 * are stroked in currentColor so the surrounding CSS controls their colour.
 */
const Glyph = ({
  size, strokeWidth, children, ...attributes
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...attributes}
  >
    {children}
  </svg>
);

Glyph.propTypes = {
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  children: PropTypes.node.isRequired,
};

Glyph.defaultProps = {
  size: 16,
  strokeWidth: 1.8,
};

export const GlobeIcon = (props) => (
  <Glyph size={22} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z" />
  </Glyph>
);

export const BurgerIcon = (props) => (
  <Glyph size={20} {...props}>
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </Glyph>
);

export const TickIcon = (props) => (
  <Glyph size={28} strokeWidth={2.5} {...props}>
    <polyline points="20 6 9 17 4 12" />
  </Glyph>
);

export const GridIcon = (props) => (
  <Glyph {...props}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </Glyph>
);

export const CompassIcon = (props) => (
  <Glyph {...props}>
    <circle cx="12" cy="12" r="9" />
    <polygon points="16.2 7.8 13.6 13.6 7.8 16.2 10.4 10.4 16.2 7.8" />
  </Glyph>
);

export const HeartIcon = (props) => (
  <Glyph {...props}>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z" />
  </Glyph>
);

export const StackIcon = (props) => (
  <Glyph {...props}>
    <polygon points="12 3 21 8 12 13 3 8 12 3" />
    <polyline points="3 13 12 18 21 13" />
  </Glyph>
);

export const UserIcon = (props) => (
  <Glyph {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Glyph>
);

export const GearIcon = (props) => (
  <Glyph {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6 1.65 1.65 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </Glyph>
);

export const SignOutIcon = (props) => (
  <Glyph {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </Glyph>
);

/** SignOutIcon's same doorway, with the arrow pointing in rather than out. */
export const SignInIcon = (props) => (
  <Glyph {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="14 7 9 12 14 17" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </Glyph>
);

/**
 * Menu items carry an `iconName` hint rather than a component, so the apps that
 * supply menu items do not have to import from this package. An unknown or absent
 * name simply renders no icon.
 */
export const NAV_ICONS = {
  dashboard: GridIcon,
  discover: CompassIcon,
  wishlist: HeartIcon,
  programs: StackIcon,
  profile: UserIcon,
  account: GearIcon,
  signout: SignOutIcon,
  login: SignInIcon,
  register: UserIcon,
};

export const NavIcon = ({ iconName }) => {
  const Icon = NAV_ICONS[iconName];
  return Icon ? <Icon /> : null;
};

NavIcon.propTypes = {
  iconName: PropTypes.string,
};

NavIcon.defaultProps = {
  iconName: null,
};
