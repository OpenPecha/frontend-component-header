import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';
import { CaretIcon } from '../Icons';

const LearningUserMenuToggle = ({
  label,
  icon,
  avatar,
  loading,
}) => (
  <>
    <Avatar size="1.5em" src={avatar} alt="" className="mr-2" loading={loading} />
    <span data-hj-suppress>
      {label}
    </span>
    <CaretIcon role="img" aria-hidden focusable="false" className="ml-1" />
  </>
);

export const LearningUserMenuTogglePropTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.shape({
    prefix: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
  }),
  avatar: PropTypes.string,
  loading: PropTypes.bool,
};

LearningUserMenuToggle.propTypes = LearningUserMenuTogglePropTypes;

LearningUserMenuToggle.defaultProps = {
  icon: null,
  avatar: null,
  loading: false,
};

export default LearningUserMenuToggle;
