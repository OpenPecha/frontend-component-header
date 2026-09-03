import React from 'react';
import PropTypes from 'prop-types';

/**
 * One row of top-level navigation links. This is the default content of both the
 * main and the secondary menu slots: the design renders them into a single
 * `nav-links` row, so the two slots sit next to each other rather than in
 * separate bars. Both render as fragments, so the row stays one flat list of
 * anchors either way.
 */
const SiteNavLinks = ({ menu }) => {
  // Consumers may hand us a ready-made node instead of a list of items.
  if (!Array.isArray(menu)) {
    return menu;
  }

  return menu.map(({
    content, href, isActive, disabled, onClick,
  }) => (
    <a
      key={`link-${content}`}
      className={`nav-link${isActive ? ' nav-link-active' : ''}${disabled ? ' disabled' : ''}`}
      href={href}
      aria-current={isActive ? 'page' : undefined}
      onClick={onClick || null}
    >
      {content}
    </a>
  ));
};

export const siteNavLinksDataShape = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.array,
]);

SiteNavLinks.propTypes = {
  menu: siteNavLinksDataShape,
};

SiteNavLinks.defaultProps = {
  menu: [],
};

export default SiteNavLinks;
