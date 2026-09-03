import React from 'react';

import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';

const LearningHeaderHelpLink = () => {
  const intl = useIntl();
  const supportUrl = getConfig().SUPPORT_URL;

  // A deployment that sets no support URL gets no link. Interpolating the missing
  // value instead - which is what this did while the link was inconspicuous grey
  // text - now puts a styled control next to the locale button that navigates
  // nowhere, or in the empty-string case one with no href at all.
  if (!supportUrl) {
    return null;
  }

  return (
    <a className="nav-help" href={supportUrl}>{intl.formatMessage(messages.help)}</a>
  );
};

export default LearningHeaderHelpLink;
