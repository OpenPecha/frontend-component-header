import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';
import { CaretIcon } from '../Icons';
const LearningUserMenuToggle = _ref => {
  let {
    label,
    icon,
    avatar,
    loading
  } = _ref;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Avatar, {
    size: "1.5em",
    src: avatar,
    alt: "",
    className: "mr-2",
    loading: loading
  }), /*#__PURE__*/React.createElement("span", {
    "data-hj-suppress": true
  }, label), /*#__PURE__*/React.createElement(CaretIcon, {
    role: "img",
    "aria-hidden": true,
    focusable: "false",
    className: "ml-1"
  }));
};
export const LearningUserMenuTogglePropTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.shape({
    prefix: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired
  }),
  avatar: PropTypes.string,
  loading: PropTypes.bool
};
LearningUserMenuToggle.propTypes = LearningUserMenuTogglePropTypes;
LearningUserMenuToggle.defaultProps = {
  icon: null,
  avatar: null,
  loading: false
};
export default LearningUserMenuToggle;
//# sourceMappingURL=LearningUserMenuToggle.js.map