import React from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';

import { Dropdown } from '@openedx/paragon';

const LearningHeaderUserMenuItems = ({ items }) => items.map((item, index) => {
  const isSignOut = item.href === getConfig().LOGOUT_URL;
  return (
    <Dropdown.Item 
      key={`menu-item-${index}`}
      href={item.href}
      className={isSignOut ? 'sign-out-item' : ''}
    >
      {item.message}
    </Dropdown.Item>
  );
});

export const learningHeaderUserMenuDataShape = {
  items: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    href: PropTypes.string,
  })),
};

LearningHeaderUserMenuItems.propTypes = learningHeaderUserMenuDataShape;

export default LearningHeaderUserMenuItems;
