import React from 'react';
import PropTypes from 'prop-types';

import { UserIcon } from './icons';

/**
 * Contents of a profile avatar - the caller supplies the circular container, so
 * this renders in both the header's trigger button and the dropdown's identity row.
 *
 * Preference order is the account's photo, then their initials, then a generic
 * person icon. The icon covers accounts with no usable initials, which includes
 * names written in a script where one glyph does not read as an initial.
 */
const ProfileAvatar = ({ src, initials, loading }) => {
  // Render nothing while the photo request is in flight, so initials do not flash
  // in and then get replaced by the picture.
  if (loading) {
    return null;
  }

  if (src) {
    return <img className="nav-profile-photo" src={src} alt="" />;
  }

  if (initials) {
    return <span aria-hidden="true">{initials}</span>;
  }

  return <UserIcon size={20} />;
};

ProfileAvatar.propTypes = {
  src: PropTypes.string,
  initials: PropTypes.string,
  loading: PropTypes.bool,
};

ProfileAvatar.defaultProps = {
  src: null,
  initials: null,
  loading: false,
};

export default ProfileAvatar;
