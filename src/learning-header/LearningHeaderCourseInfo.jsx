import React from 'react';
import PropTypes from 'prop-types';

const renderMixedText = (text) => {
  if (!text) return null;

  const tibetanRegex = /[\u0F00-\u0FFF]+/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = tibetanRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    parts.push(
      // Styling lives in `@edx/brand/paragon/header` as `.course-title-tibetan`
      // - see the comment there for why it's un-bolded and sized the way it is.
      <span key={match.index} className="course-title-tibetan">
        {match[0]}
      </span>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

const LearningHeaderCourseInfo = ({
  courseOrg,
  courseNumber,
  courseTitle,
}) => {
  return (
    <div style={{ minWidth: 0 }}>
      <span className="d-block m-0 font-weight-bold course-title">
        {renderMixedText(courseTitle)}
      </span>
    </div>
  );
};

export const courseInfoDataShape = {
  courseOrg: PropTypes.string,
  courseNumber: PropTypes.string,
  courseTitle: PropTypes.string,
};

LearningHeaderCourseInfo.propTypes = courseInfoDataShape;

export default LearningHeaderCourseInfo;
