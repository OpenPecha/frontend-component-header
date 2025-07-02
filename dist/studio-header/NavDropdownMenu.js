import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownButton } from '@openedx/paragon';
import { Link } from 'react-router-dom';
const NavDropdownMenu = _ref => {
  let {
    id,
    buttonTitle,
    items
  } = _ref;
  return /*#__PURE__*/React.createElement(DropdownButton, {
    id: id,
    title: buttonTitle,
    variant: "outline-primary",
    className: "mr-2"
  }, items.map(item => /*#__PURE__*/React.createElement(Dropdown.Item, {
    as: Link,
    key: `${item.title}-dropdown-item`,
    to: item.href,
    className: "small"
  }, item.title)));
};
NavDropdownMenu.propTypes = {
  id: PropTypes.string.isRequired,
  buttonTitle: PropTypes.node.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string.isRequired,
    title: PropTypes.node.isRequired
  })).isRequired
};
export default NavDropdownMenu;
//# sourceMappingURL=NavDropdownMenu.js.map