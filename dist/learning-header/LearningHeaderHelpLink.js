import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';
const LearningHeaderHelpLink = () => {
  const intl = useIntl();
  return /*#__PURE__*/React.createElement("a", {
    className: "text-gray-700",
    href: `${getConfig().SUPPORT_URL}`
  }, intl.formatMessage(messages.help));
};
export default LearningHeaderHelpLink;
//# sourceMappingURL=LearningHeaderHelpLink.js.map