import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { OverlayTrigger, Tooltip } from '@openedx/paragon';
import { Link } from 'react-router-dom';
import messages from './messages';
const CourseLockUp = ({
  outlineLink,
  org,
  number,
  title
}) => {
  const intl = useIntl();
  return /*#__PURE__*/React.createElement(OverlayTrigger, {
    placement: "bottom",
    overlay: /*#__PURE__*/React.createElement(Tooltip, {
      id: "course-lock-up"
    }, title)
  }, /*#__PURE__*/React.createElement(Link, {
    className: "course-title-lockup mr-2",
    to: outlineLink,
    "aria-label": intl.formatMessage(messages['header.label.courseOutline']),
    "data-testid": "course-lock-up-block"
  }, /*#__PURE__*/React.createElement("span", {
    className: "d-block small m-0 text-gray-800",
    "data-testid": "course-org-number"
  }, org, " ", number), /*#__PURE__*/React.createElement("span", {
    className: "d-block m-0 font-weight-bold text-gray-800",
    "data-testid": "course-title"
  }, title)));
};
CourseLockUp.propTypes = {
  number: PropTypes.string,
  org: PropTypes.string,
  title: PropTypes.string,
  outlineLink: PropTypes.string
};
CourseLockUp.defaultProps = {
  number: null,
  org: null,
  title: null,
  outlineLink: null
};
export default CourseLockUp;
//# sourceMappingURL=CourseLockUp.js.map