import React from 'react';

import { getConfig } from '@edx/frontend-platform';
import { getLoginRedirectUrl } from '@edx/frontend-platform/auth';
import { useIntl } from '@edx/frontend-platform/i18n';
import LearningLoggedOutItemsSlot from '../plugin-slots/LearningLoggedOutItemsSlot';

import genericMessages from '../generic/messages';

/**
 * The register/sign-in items, in the shape both the wide layout's buttons and
 * the burger menu's rows expect. A hook rather than a plain function since it
 * needs `useIntl`; called independently by each renderer rather than computed
 * once and threaded through as a prop, since it's cheap, pure, and this keeps
 * `AnonymousUserMenu` prop-free for its one existing caller.
 */
export const useLoggedOutItems = () => {
  const intl = useIntl();

  // Register comes first and sign in second, matching the design. `variant` says
  // which is the primary action rather than relying on that order.
  return [
    {
      type: 'item',
      content: intl.formatMessage(genericMessages.registerSentenceCase),
      href: `${getConfig().LMS_BASE_URL}/register?next=${encodeURIComponent(global.location.href)}`,
      iconName: 'register',
      variant: 'register',
    },
    {
      type: 'item',
      content: intl.formatMessage(genericMessages.signInSentenceCase),
      href: getLoginRedirectUrl(global.location.href),
      iconName: 'login',
      variant: 'signin',
    },
  ];
};

const AnonymousUserMenu = () => {
  const buttonsInfo = useLoggedOutItems();

  return <LearningLoggedOutItemsSlot buttonsInfo={buttonsInfo} />;
};

export default AnonymousUserMenu;
