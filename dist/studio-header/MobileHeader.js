const _excluded = ["mainMenuDropdowns"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useToggle, ModalPopup } from '@openedx/paragon';
import HeaderBody from './HeaderBody';
import MobileMenu from './MobileMenu';
const MobileHeader = _ref => {
  let {
      mainMenuDropdowns
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  const [isOpen,, close, toggle] = useToggle(false);
  const [target, setTarget] = useState(null);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(HeaderBody, _extends({}, props, {
    isMobile: true,
    setModalPopupTarget: setTarget,
    toggleModalPopup: toggle,
    isModalPopupOpen: isOpen
  })), /*#__PURE__*/React.createElement(ModalPopup, {
    hasArrow: true,
    placement: "bottom",
    positionRef: target,
    isOpen: isOpen,
    onClose: close,
    onEscapeKey: close,
    className: "mobile-menu-container"
  }, /*#__PURE__*/React.createElement(MobileMenu, {
    mainMenuDropdowns
  })));
};
MobileHeader.propTypes = {
  studioBaseUrl: PropTypes.string.isRequired,
  // eslint-disable-line react/no-unused-prop-types
  logoutUrl: PropTypes.string.isRequired,
  // eslint-disable-line react/no-unused-prop-types
  number: PropTypes.string,
  // eslint-disable-line react/no-unused-prop-types
  org: PropTypes.string,
  // eslint-disable-line react/no-unused-prop-types
  title: PropTypes.string,
  // eslint-disable-line react/no-unused-prop-types
  logo: PropTypes.string,
  // eslint-disable-line react/no-unused-prop-types
  logoAltText: PropTypes.string,
  // eslint-disable-line react/no-unused-prop-types
  authenticatedUserAvatar: PropTypes.string,
  // eslint-disable-line react/no-unused-prop-types
  username: PropTypes.string,
  // eslint-disable-line react/no-unused-prop-types
  isAdmin: PropTypes.bool,
  // eslint-disable-line react/no-unused-prop-types
  mainMenuDropdowns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    buttonTitle: PropTypes.node,
    items: PropTypes.arrayOf(PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.node
    }))
  })),
  outlineLink: PropTypes.string // eslint-disable-line react/no-unused-prop-types
};
MobileHeader.defaultProps = {
  logo: null,
  logoAltText: null,
  number: null,
  org: null,
  title: null,
  authenticatedUserAvatar: null,
  username: null,
  isAdmin: false,
  mainMenuDropdowns: [],
  outlineLink: null
};
export default MobileHeader;
//# sourceMappingURL=MobileHeader.js.map