import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const BrandNav = ({
  studioBaseUrl,
  logo,
  logoAltText
}) => /*#__PURE__*/React.createElement(Link, {
  to: studioBaseUrl
}, /*#__PURE__*/React.createElement("img", {
  src: logo,
  alt: logoAltText,
  className: "d-block logo"
}));
BrandNav.propTypes = {
  studioBaseUrl: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  logoAltText: PropTypes.string.isRequired
};
export default BrandNav;
//# sourceMappingURL=BrandNav.js.map