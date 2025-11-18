import React from 'react';
import PropTypes from 'prop-types';
import { Collapsible } from '@openedx/paragon';
import { Link } from 'react-router-dom';
const MobileMenu = _ref => {
  let {
    mainMenuDropdowns
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    className: "ml-4 p-2 bg-light-100 border border-gray-200 small rounded",
    "data-testid": "mobile-menu"
  }, /*#__PURE__*/React.createElement("div", null, mainMenuDropdowns.map(dropdown => {
    const {
      id,
      buttonTitle,
      items
    } = dropdown;
    return /*#__PURE__*/React.createElement(Collapsible, {
      className: "border-light-100",
      title: buttonTitle,
      key: id
    }, /*#__PURE__*/React.createElement("ul", {
      className: "p-0",
      style: {
        listStyleType: 'none'
      }
    }, items.map(item => /*#__PURE__*/React.createElement("li", {
      className: "mobile-menu-item"
    }, /*#__PURE__*/React.createElement(Link, {
      to: item.href
    }, item.title)))));
  })));
};
MobileMenu.propTypes = {
  mainMenuDropdowns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    buttonTitle: PropTypes.node,
    items: PropTypes.arrayOf(PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.node
    }))
  }))
};
MobileMenu.defaultProps = {
  mainMenuDropdowns: []
};
export default MobileMenu;
//# sourceMappingURL=MobileMenu.js.map