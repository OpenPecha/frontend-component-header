import { FALLBACK_LANGUAGE_CODES, NATIVE_LANGUAGE_NAMES } from './languages';

/**
 * Matches strings that open with a Latin letter: basic Latin plus the Latin-1
 * Supplement and Latin Extended-A/B blocks, so accented names still qualify.
 */
const STARTS_WITH_LATIN = /^[A-Za-zÀ-ɏ]/;

/**
 * Initials for the profile avatar.
 *
 * Returns null when there is nothing sensible to show, which is the caller's cue
 * to fall back to a generic person icon. That happens for names written in a
 * script where a single glyph does not read as an initial - Tibetan and Chinese
 * among them - and when neither a name nor a username is available.
 *
 * @param {string} name the account's full name, may be empty
 * @param {string} username the account's username, used when there is no name
 * @returns {string|null} one or two uppercase letters, or null
 */
const getInitials = (name, username) => {
  const fullName = (name || '').trim();

  if (fullName) {
    if (!STARTS_WITH_LATIN.test(fullName)) {
      return null;
    }
    const words = fullName.split(/\s+/).filter(Boolean);
    const first = words[0][0];
    // A single-word name contributes one letter rather than doubling up.
    const last = words.length > 1 ? words[words.length - 1][0] : '';
    return `${first}${last}`.toUpperCase();
  }

  const handle = (username || '').trim();
  if (!handle || !STARTS_WITH_LATIN.test(handle)) {
    return null;
  }
  return handle[0].toUpperCase();
};

export default getInitials;

/**
 * The name to show for a locale the platform released.
 *
 * A language the operator deliberately released has to appear in the menu even when it
 * predates this file, so an unmapped code asks the browser for its endonym before
 * falling back to the bare code. Intl.DisplayNames returns the name in the language
 * being named, which is the same "native name, no gloss" the map provides.
 *
 * @param {string} code a lowercase, hyphenated locale code
 * @returns {string} a human-readable name, never empty
 */
const nativeNameFor = (code) => {
  const mapped = NATIVE_LANGUAGE_NAMES[code];
  if (mapped) {
    return mapped;
  }

  try {
    const endonym = new Intl.DisplayNames([code], { type: 'language' }).of(code);
    // DisplayNames echoes the input back when it has no data for the locale.
    if (endonym && endonym.toLowerCase() !== code) {
      return endonym;
    }
  } catch (error) {
    // An unparseable code, or a runtime built without the full ICU data.
  }

  return code.toUpperCase();
};

/**
 * The languages to offer in the header menu.
 *
 * Accepts what the platform's config API sends - either bare codes or
 * `{ code, name }` objects - and keeps its order, which reflects the operator's
 * DarkLangConfig. The API's `name` is deliberately ignored in favour of our own
 * native-name map. An absent or empty list falls back to the built-in codes, so the
 * menu is never empty.
 *
 * @param {Array<string|{code: string}>} configLanguages RELEASED_LANGUAGES, possibly undefined
 * @returns {Array<{code: string, native: string}>}
 */
export const resolveHeaderLanguages = (configLanguages) => {
  const codes = (Array.isArray(configLanguages) ? configLanguages : [])
    .map((entry) => (typeof entry === 'string' ? entry : entry && entry.code))
    .filter((code) => typeof code === 'string' && code.trim())
    .map((code) => code.trim().toLowerCase());

  const unique = [...new Set(codes)];
  const source = unique.length ? unique : FALLBACK_LANGUAGE_CODES;

  return source.map((code) => ({ code, native: nativeNameFor(code) }));
};

/**
 * Which menu row, if any, corresponds to the given locale.
 *
 * The menu's codes carry regions ('es-419', 'zh-cn') while a locale may be bare ('es'),
 * or the other way round, so an exact match is only the first of the ways a locale can
 * belong to a row. Returns null rather than guessing: leaving every row unticked is
 * more honest than telling someone their language is English when it isn't.
 *
 * @param {string} locale the locale to look for
 * @param {Array<{code: string}>} languages the rows on offer
 * @returns {string|null} the matching row's code, or null
 */
export const matchActiveLanguage = (locale, languages) => {
  const target = (locale || '').trim().toLowerCase();
  if (!target) {
    return null;
  }

  const codes = (languages || []).map(({ code }) => code);
  const exact = codes.find((code) => code === target);
  if (exact) {
    return exact;
  }

  const primary = target.split('-')[0];
  // 'es-419' wanted, only 'es' offered.
  const bare = codes.find((code) => code === primary);
  if (bare) {
    return bare;
  }
  // 'es' wanted, only 'es-419' offered - the first such row wins.
  return codes.find((code) => code.split('-')[0] === primary) || null;
};

/**
 * The language the visitor has actually asked for, straight from the cookie.
 *
 * Read here rather than through the platform's getLocale() because that already
 * collapses a locale this app has no translations for down to English - which would
 * un-tick the row the visitor just chose. The cookie is their stated preference and is
 * what this menu edits.
 *
 * @param {string} cookieName LANGUAGE_PREFERENCE_COOKIE_NAME from the app config
 * @returns {string|null} the preferred locale, or null when nothing is stored
 */
export const readLanguageCookie = (cookieName) => {
  if (typeof document === 'undefined' || !cookieName) {
    return null;
  }
  // cookieName is a config value, not a literal - a name containing a regex
  // metacharacter (a stray '(' is enough) would otherwise throw on every render.
  const escapedName = cookieName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${escapedName}=([^;]*)`));
  return match ? decodeURIComponent(match[1]).trim().toLowerCase() : null;
};
