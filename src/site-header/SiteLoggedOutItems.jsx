import React from 'react';
import PropTypes from 'prop-types';

/**
 * The sign in and register buttons shown on wide screens. Register is the outlined
 * button and sign in the filled one. The `variant` hint decides which; without it,
 * among two or more items the last one is treated as the primary action, which is
 * how the older header ordered these too. A single item with no `variant` is never
 * inferred as primary this way - "last of the list" and "the only item" are the
 * same position, so that rule can't tell them apart, and defaulting a lone item to
 * the quieter, outlined style is the safer guess when the caller hasn't said. There
 * is no position-based rule that gets a lone item right in every case, so
 * `itemsWithVariantWarning` below flags it instead of silently picking one.
 */
const SiteLoggedOutItems = ({ items }) => items.map((item, index) => {
  const isPrimary = item.variant
    ? item.variant === 'signin'
    : items.length > 1 && index === items.length - 1;
  return (
    <a
      key={`auth-${item.content}`}
      className={`nav-auth ${isPrimary ? 'nav-auth-signin' : 'nav-auth-register'}`}
      href={item.href}
    >
      {item.content}
    </a>
  );
});

const itemsArrayShape = PropTypes.arrayOf(PropTypes.shape({
  type: PropTypes.oneOf(['item', 'menu']),
  href: PropTypes.string,
  content: PropTypes.string,
  iconName: PropTypes.string,
  variant: PropTypes.oneOf(['register', 'signin']),
}));

/**
 * Wraps the shape check above with one more: a single item with no `variant`
 * can't be styled correctly by the position-based fallback (see the component
 * doc comment), so callers should set `variant` explicitly whenever they only
 * supply one item. A custom validator rather than a runtime check in the
 * component itself, so it's a development-time warning - deduplicated the
 * same way any other PropTypes failure is - not console noise on every render.
 */
const itemsWithVariantWarning = (props, propName, componentName, ...rest) => {
  const shapeError = itemsArrayShape(props, propName, componentName, ...rest);
  if (shapeError) {
    return shapeError;
  }
  const items = props[propName];
  if (Array.isArray(items) && items.length === 1 && !items[0].variant) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`: a single entry with no `
      + '`variant` renders as the outlined (register) style by default, since "last of the list" and '
      + '"the only item" look identical from position alone. Set `variant: \'signin\'` explicitly if '
      + 'this one item should be the primary (filled) action instead.',
    );
  }
  return null;
};

export const siteLoggedOutItemsDataShape = itemsArrayShape;

SiteLoggedOutItems.propTypes = {
  items: itemsWithVariantWarning,
};

SiteLoggedOutItems.defaultProps = {
  items: [],
};

export default SiteLoggedOutItems;
