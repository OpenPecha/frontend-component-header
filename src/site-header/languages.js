/**
 * Native names for the locales the platform can serve.
 *
 * Each language reads in its own script with no English gloss, so the menu looks the
 * same to every visitor regardless of the interface language. The platform's own names
 * (from `settings.LANGUAGES`) carry glosses - "བོད་ཡིག (Tibetan)" - which is why the
 * header maps codes itself rather than displaying what the API sends.
 *
 * Codes are lowercase and hyphenated, matching what the LMS emits. Regional variants are
 * listed in their own right: 'zh-cn' and 'zh-tw' are not the same name, so deriving the
 * label by stripping the region would be wrong.
 */
export const NATIVE_LANGUAGE_NAMES = {
  ar: 'العربية',
  bo: 'བོད་ཡིག',
  cs: 'Čeština',
  da: 'Dansk',
  de: 'Deutsch',
  'de-de': 'Deutsch',
  el: 'Ελληνικά',
  en: 'English',
  es: 'Español',
  'es-419': 'Español (Latinoamérica)',
  'es-es': 'Español (España)',
  fa: 'فارسی',
  'fa-ir': 'فارسی',
  fr: 'Français',
  'fr-ca': 'Français (Canada)',
  he: 'עברית',
  hi: 'हिन्दी',
  id: 'Bahasa Indonesia',
  it: 'Italiano',
  'it-it': 'Italiano',
  ja: '日本語',
  'ko-kr': '한국어',
  lv: 'Latviešu',
  pl: 'Polski',
  pt: 'Português',
  'pt-br': 'Português (Brasil)',
  'pt-pt': 'Português',
  ro: 'Română',
  ru: 'Русский',
  sl: 'Slovenščina',
  sw: 'Kiswahili',
  te: 'తెలుగు',
  th: 'ไทย',
  tr: 'Türkçe',
  'tr-tr': 'Türkçe',
  uk: 'Українська',
  uz: 'Oʻzbekcha',
  vi: 'Tiếng Việt',
  zh: '中文',
  'zh-cn': '中文 (简体)',
  'zh-hk': '中文 (香港)',
  'zh-tw': '中文 (繁體)',
};

/**
 * Shown when the platform hasn't told us which languages are released - an older LMS, or
 * a config request that failed. Better a slightly stale menu than no menu at all.
 */
export const FALLBACK_LANGUAGE_CODES = [
  'en',
  'bo',
  'es-419',
  'fr',
  'id',
  'vi',
  'zh-cn',
];
