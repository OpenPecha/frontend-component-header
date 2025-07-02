import React from 'react';
import PropTypes from 'prop-types';
import { AvatarIcon } from './Icons';
const Avatar = _ref => {
  let {
    size,
    src,
    alt,
    className,
    loading
  } = _ref;
  // While loading, render a placeholder to prevent the default icon from flashing.
  if (loading) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        height: size,
        width: size
      },
      className: `avatar overflow-hidden d-inline-flex rounded-circle ${className}`
    });
  }
  const avatar = src ? /*#__PURE__*/React.createElement("img", {
    className: "d-block w-100 h-100",
    src: src,
    alt: alt
  }) : /*#__PURE__*/React.createElement(AvatarIcon, {
    style: {
      width: size,
      height: size,
      color: '#093055'
    },
    role: "img",
    "aria-hidden": true,
    focusable: "false"
  });
  return /*#__PURE__*/React.createElement("span", {
    style: {
      height: size,
      width: size
    },
    className: `avatar overflow-hidden d-inline-flex rounded-circle ${className}`
  }, avatar);
};
Avatar.propTypes = {
  loading: PropTypes.bool,
  src: PropTypes.string,
  size: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string
};
Avatar.defaultProps = {
  loading: false,
  src: null,
  size: '2rem',
  alt: null,
  className: null
};
export default Avatar;
//# sourceMappingURL=Avatar.js.map