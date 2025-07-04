import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import AnonymousUserMenu from './AnonymousUserMenu';
import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
import LogoSlot from '../plugin-slots/LogoSlot';
import CourseInfoSlot from '../plugin-slots/CourseInfoSlot';
import { courseInfoDataShape } from './LearningHeaderCourseInfo';
import messages from './messages';
import LearningHelpSlot from '../plugin-slots/LearningHelpSlot';
const LearningHeader = _ref => {
  let {
    courseOrg,
    courseNumber,
    courseTitle,
    intl,
    showUserDropdown
  } = _ref;
  const {
    authenticatedUser,
    config
  } = useContext(AppContext);

  // State for avatar URL and loading state
  const [avatarState, setAvatarState] = useState({
    loading: true,
    url: null
  });

  // Fetch the profile image URL from the API when the component mounts or authenticatedUser changes
  useEffect(() => {
    const fetchProfileImage = async () => {
      // If the user is logged out, we are not loading, and there is no image.
      if (authenticatedUser === null) {
        setAvatarState({
          loading: false,
          url: null
        });
        return;
      }

      // If we don't have a username yet, remain in the loading state.
      if (!authenticatedUser?.username) {
        setAvatarState({
          loading: true,
          url: null
        });
        return;
      }
      try {
        const baseUrl = getConfig().LMS_BASE_URL || '';
        const apiUrl = `${baseUrl}/api/user/v1/accounts/${authenticatedUser.username}`;
        const response = await fetch(apiUrl, {
          credentials: 'include',
          headers: {
            'Accept': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.profile_image?.image_url_medium;
          const hasImage = data.profile_image?.has_image;

          // Use the fetched image if it exists and is not a default one.
          if (imageUrl && hasImage) {
            setAvatarState({
              loading: false,
              url: imageUrl
            });
          } else {
            // Otherwise, fallback to the default icon.
            setAvatarState({
              loading: false,
              url: null
            });
          }
        } else {
          // If the request fails, fallback to the default icon.
          setAvatarState({
            loading: false,
            url: null
          });
        }
      } catch (error) {
        // If there's an error, fallback to the default icon.
        setAvatarState({
          loading: false,
          url: null
        });
      }
    };
    fetchProfileImage();
  }, [authenticatedUser]);
  const headerLogo = /*#__PURE__*/React.createElement(LogoSlot, {
    href: `${getConfig().LMS_BASE_URL}/dashboard`,
    src: getConfig().LOGO_URL,
    alt: getConfig().SITE_NAME
  });
  return /*#__PURE__*/React.createElement("header", {
    className: "learning-header"
  }, /*#__PURE__*/React.createElement("a", {
    className: "sr-only sr-only-focusable",
    href: "#main-content"
  }, intl.formatMessage(messages.skipNavLink)), /*#__PURE__*/React.createElement("div", {
    className: "container-xl py-2 d-flex align-items-center"
  }, headerLogo, /*#__PURE__*/React.createElement("div", {
    className: "flex-grow-1 course-title-lockup d-flex",
    style: {
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement(CourseInfoSlot, {
    courseOrg: courseOrg,
    courseNumber: courseNumber,
    courseTitle: courseTitle
  })), showUserDropdown && authenticatedUser && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LearningHelpSlot, null), /*#__PURE__*/React.createElement(AuthenticatedUserDropdown, {
    username: authenticatedUser.username,
    avatar: avatarState.url,
    loading: avatarState.loading
  })), showUserDropdown && !authenticatedUser && /*#__PURE__*/React.createElement(AnonymousUserMenu, null)));
};
LearningHeader.propTypes = {
  courseOrg: courseInfoDataShape.courseOrg,
  courseNumber: courseInfoDataShape.courseNumber,
  courseTitle: courseInfoDataShape.courseTitle,
  intl: intlShape.isRequired,
  showUserDropdown: PropTypes.bool
};
LearningHeader.defaultProps = {
  courseOrg: null,
  courseNumber: null,
  courseTitle: null,
  showUserDropdown: true
};
export default injectIntl(LearningHeader);
//# sourceMappingURL=LearningHeader.js.map