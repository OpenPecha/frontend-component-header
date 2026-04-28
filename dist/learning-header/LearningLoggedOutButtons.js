import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@openedx/paragon';
const LearningLoggedOutButtons = ({
  buttonsInfo
}) => buttonsInfo.map(buttonInfo => /*#__PURE__*/React.createElement(Button, {
  className: "ml-3",
  variant: buttonInfo.variant ?? 'outline-primary',
  href: buttonInfo.href
}, buttonInfo.message));
export const learningHeaderLoggedOutItemsDataShape = {
  buttonsInfo: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    href: PropTypes.string,
    variant: PropTypes.string
  }))
};
LearningLoggedOutButtons.propTypes = learningHeaderLoggedOutItemsDataShape;
export default LearningLoggedOutButtons;
//# sourceMappingURL=LearningLoggedOutButtons.js.map