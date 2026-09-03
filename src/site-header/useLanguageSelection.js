import {
  useCallback, useContext, useMemo, useRef, useState,
} from 'react';
import { getConfig, publish } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';
import { logError } from '@edx/frontend-platform/logging';
import {
  getLocale, handleRtl, useIntl, LOCALE_CHANGED,
} from '@edx/frontend-platform/i18n';

import { matchActiveLanguage, readLanguageCookie, resolveHeaderLanguages } from './utils';
import { patchLanguagePreference, postSetLang } from './service';

/**
 * The language list, which one is current, and how to change it.
 *
 * Switching does not reload the page: AppProvider listens for LOCALE_CHANGED and swaps
 * the locale on its IntlProvider, so publishing the event re-renders the app in the new
 * language. This mirrors what frontend-app-account does when its settings form saves.
 *
 * @param {object} [options]
 * @param {Function} [options.onSwitched] called once the language has actually changed
 */
const useLanguageSelection = ({ onSwitched } = {}) => {
  const intl = useIntl();
  const { authenticatedUser } = useContext(AppContext);
  const [selectedCode, setSelectedCode] = useState(null);
  const [pendingCode, setPendingCode] = useState(null);
  // A ref alongside the state: two clicks in the same tick would both read the old state.
  const inFlight = useRef(false);

  const { RELEASED_LANGUAGES, LANGUAGE_PREFERENCE_COOKIE_NAME } = getConfig();

  const languages = useMemo(
    () => resolveHeaderLanguages(RELEASED_LANGUAGES),
    [RELEASED_LANGUAGES],
  );

  // The cookie is the visitor's stated preference; intl.locale is the best signal we
  // have before they have ever expressed one. selectedCode wins over both so the tick
  // moves the moment a switch succeeds, without waiting to observe the new cookie.
  const activeCode = selectedCode ?? matchActiveLanguage(
    readLanguageCookie(LANGUAGE_PREFERENCE_COOKIE_NAME) || intl.locale,
    languages,
  );

  const selectLanguage = useCallback(async (code) => {
    if (inFlight.current) {
      return;
    }
    if (code === activeCode) {
      if (onSwitched) { onSwitched(); }
      return;
    }

    inFlight.current = true;
    setPendingCode(code);

    try {
      if (authenticatedUser && authenticatedUser.username) {
        try {
          await patchLanguagePreference(authenticatedUser.username, code);
        } catch (error) {
          // Losing the cross-device preference is not a reason to refuse the visitor the
          // language they just asked for in this browser.
          logError(error);
        }
      }

      await postSetLang(code);

      setSelectedCode(code);
      // getLocale() rather than the raw code: it reports what will actually render,
      // which may fall back to English where this app has no messages for the locale.
      publish(LOCALE_CHANGED, getLocale());
      handleRtl();
      if (onSwitched) { onSwitched(); }
    } catch (error) {
      // The switch failed, so nothing is published and nothing moves - the menu stays
      // open on the current language and the visitor can try again.
      logError(error);
    } finally {
      inFlight.current = false;
      setPendingCode(null);
    }
  }, [activeCode, authenticatedUser, onSwitched]);

  return {
    languages,
    activeCode,
    pendingCode,
    isBusy: pendingCode !== null,
    selectLanguage,
  };
};

export default useLanguageSelection;
