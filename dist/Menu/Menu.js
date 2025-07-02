const _excluded = ["tag", "className"],
  _excluded2 = ["tag", "className"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
const MenuTrigger = _ref => {
  let {
      tag,
      className
    } = _ref,
    attributes = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement(tag, _objectSpread({
    className: `menu-trigger ${className}`
  }, attributes));
};
MenuTrigger.propTypes = {
  tag: PropTypes.string,
  className: PropTypes.string
};
MenuTrigger.defaultProps = {
  tag: 'div',
  className: null
};
const MenuTriggerComp = /*#__PURE__*/React.createElement(MenuTrigger, null);
const MenuTriggerType = MenuTriggerComp.type;
const MenuContent = _ref2 => {
  let {
      tag,
      className
    } = _ref2,
    attributes = _objectWithoutProperties(_ref2, _excluded2);
  return /*#__PURE__*/React.createElement(tag, _objectSpread({
    className: ['menu-content', className].join(' ')
  }, attributes));
};
MenuContent.propTypes = {
  tag: PropTypes.string,
  className: PropTypes.string
};
MenuContent.defaultProps = {
  tag: 'div',
  className: null
};
const menuPropTypes = {
  tag: PropTypes.string,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  closeOnDocumentClick: PropTypes.bool,
  respondToPointerEvents: PropTypes.bool,
  className: PropTypes.string,
  transitionTimeout: PropTypes.number,
  transitionClassName: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node).isRequired
};
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.menu = /*#__PURE__*/React.createRef();
    this.state = {
      expanded: false
    };
    this.onTriggerClick = this.onTriggerClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  // Lifecycle Events
  componentWillUnmount() {
    document.removeEventListener('touchend', this.onDocumentClick, true);
    document.removeEventListener('click', this.onDocumentClick, true);

    // Call onClose callback when unmounting and open
    if (this.state.expanded && this.props.onClose) {
      this.props.onClose();
    }
  }

  // Event handlers
  onDocumentClick(e) {
    if (!this.props.closeOnDocumentClick) {
      return;
    }
    const clickIsInMenu = this.menu.current === e.target || this.menu.current.contains(e.target);
    if (clickIsInMenu) {
      return;
    }
    this.close();
  }
  onTriggerClick(e) {
    // Let the browser follow the link of the trigger if the menu
    // is already expanded and the trigger has an href attribute
    if (this.state.expanded && e.target.getAttribute('href')) {
      return;
    }
    e.preventDefault();
    this.toggle();
  }
  onCloseClick() {
    this.getFocusableElements()[0].focus();
    this.close();
  }
  onKeyDown(e) {
    if (!this.state.expanded) {
      return;
    }
    switch (e.key) {
      case 'Escape':
        {
          e.preventDefault();
          e.stopPropagation();
          this.getFocusableElements()[0].focus();
          this.close();
          break;
        }
      case 'Enter':
        {
          // Using focusable elements instead of a ref to the trigger
          // because Hyperlink and Button can handle refs as functional components
          if (document.activeElement === this.getFocusableElements()[0]) {
            e.preventDefault();
            this.toggle();
          }
          break;
        }
      case 'Tab':
        {
          e.preventDefault();
          if (e.shiftKey) {
            this.focusPrevious();
          } else {
            this.focusNext();
          }
          break;
        }
      case 'ArrowDown':
        {
          e.preventDefault();
          this.focusNext();
          break;
        }
      case 'ArrowUp':
        {
          e.preventDefault();
          this.focusPrevious();
          break;
        }
      default:
    }
  }
  onMouseEnter() {
    if (!this.props.respondToPointerEvents) {
      return;
    }
    this.open();
  }
  onMouseLeave() {
    if (!this.props.respondToPointerEvents) {
      return;
    }
    this.close();
  }

  // Internal functions

  getFocusableElements() {
    return this.menu.current.querySelectorAll('button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])');
  }
  getAttributesFromProps() {
    // Any extra props are attributes for the menu
    const attributes = {};
    Object.keys(this.props).filter(property => menuPropTypes[property] === undefined).forEach(property => {
      attributes[property] = this.props[property];
    });
    return attributes;
  }
  focusNext() {
    const focusableElements = Array.from(this.getFocusableElements());
    const activeIndex = focusableElements.indexOf(document.activeElement);
    const nextIndex = (activeIndex + 1) % focusableElements.length;
    focusableElements[nextIndex].focus();
  }
  focusPrevious() {
    const focusableElements = Array.from(this.getFocusableElements());
    const activeIndex = focusableElements.indexOf(document.activeElement);
    const previousIndex = (activeIndex || focusableElements.length) - 1;
    focusableElements[previousIndex].focus();
  }
  open() {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
    this.setState({
      expanded: true
    });
    // Listen to touchend and click events to ensure the menu
    // can be closed on mobile, pointer, and mixed input devices
    document.addEventListener('touchend', this.onDocumentClick, true);
    document.addEventListener('click', this.onDocumentClick, true);
  }
  close() {
    if (this.props.onClose) {
      this.props.onClose();
    }
    this.setState({
      expanded: false
    });
    document.removeEventListener('touchend', this.onDocumentClick, true);
    document.removeEventListener('click', this.onDocumentClick, true);
  }
  toggle() {
    if (this.state.expanded) {
      this.close();
    } else {
      this.open();
    }
  }
  renderTrigger(node) {
    return /*#__PURE__*/React.cloneElement(node, {
      onClick: this.onTriggerClick,
      'aria-haspopup': 'menu',
      'aria-expanded': this.state.expanded
    });
  }
  renderMenuContent(node) {
    return /*#__PURE__*/React.createElement(CSSTransition, {
      in: this.state.expanded,
      timeout: this.props.transitionTimeout,
      classNames: this.props.transitionClassName,
      unmountOnExit: true
    }, node);
  }
  render() {
    const {
      className
    } = this.props;
    const wrappedChildren = React.Children.map(this.props.children, child => {
      if (child.type === MenuTriggerType) {
        return this.renderTrigger(child);
      }
      return this.renderMenuContent(child);
    });
    const rootClassName = this.state.expanded ? 'menu expanded' : 'menu';
    return /*#__PURE__*/React.createElement(this.props.tag, _objectSpread({
      className: `${rootClassName} ${className}`,
      ref: this.menu,
      onKeyDown: this.onKeyDown,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave
    }, this.getAttributesFromProps()), wrappedChildren);
  }
}
Menu.propTypes = menuPropTypes;
Menu.defaultProps = {
  tag: 'div',
  className: null,
  onClose: null,
  onOpen: null,
  respondToPointerEvents: false,
  closeOnDocumentClick: true,
  transitionTimeout: 250,
  transitionClassName: 'menu-content'
};
export { Menu, MenuTrigger, MenuContent };
//# sourceMappingURL=Menu.js.map