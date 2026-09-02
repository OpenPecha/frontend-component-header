import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

/**
 * Ask the LMS to serve this language from now on.
 *
 * This is what actually writes the shared language cookie every Open edX app reads, so
 * it is the call that decides the outcome. It works signed out as well as in: `isPublic`
 * stops the JWT interceptor from trying to refresh a token that isn't there, while the
 * CSRF interceptor - which this POST does need - still runs.
 *
 * getAuthenticatedHttpClient is required even for anonymous visitors; getHttpClient is a
 * bare axios instance with neither the CSRF interceptor nor withCredentials, so the
 * request would be rejected.
 *
 * @param {string} code the locale to switch to
 * @returns {Promise}
 */
export const postSetLang = (code) => {
  const formData = new FormData();
  formData.append('language', code);

  return getAuthenticatedHttpClient().post(
    `${getConfig().LMS_BASE_URL}/i18n/setlang/`,
    formData,
    {
      isPublic: true,
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    },
  );
};

/**
 * Record the choice against the account, so it follows the learner to other browsers.
 *
 * Only meaningful when signed in, and only a convenience: the language of the session
 * in front of us is settled by postSetLang, not by this.
 *
 * @param {string} username the signed-in user
 * @param {string} code the locale to store
 * @returns {Promise}
 */
export const patchLanguagePreference = (username, code) => getAuthenticatedHttpClient().patch(
  `${getConfig().LMS_BASE_URL}/api/user/v1/preferences/${username}`,
  { 'pref-lang': code },
  { headers: { 'Content-Type': 'application/merge-patch+json' } },
);
