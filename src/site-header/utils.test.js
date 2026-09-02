import getInitials, {
  matchActiveLanguage, readLanguageCookie, resolveHeaderLanguages,
} from './utils';
import { FALLBACK_LANGUAGE_CODES } from './languages';

describe('getInitials', () => {
  it('takes the first and last initial of a full name', () => {
    expect(getInitials('Tenzin Dorjee', 'tenzin')).toBe('TD');
  });

  it('uses the first and last word when there is a middle name', () => {
    expect(getInitials('Ada Grace Lovelace', 'ada')).toBe('AL');
  });

  it('gives a single letter for a one-word name', () => {
    expect(getInitials('Tenzin', 'tenzin')).toBe('T');
  });

  it('keeps accented Latin names', () => {
    expect(getInitials('Émile Dupont', 'emile')).toBe('ÉD');
  });

  it('falls back to the username when there is no name', () => {
    expect(getInitials('', 'tenzin')).toBe('T');
    expect(getInitials(null, 'tenzin')).toBe('T');
  });

  it('ignores surrounding whitespace', () => {
    expect(getInitials('  Tenzin   Dorjee  ', 'tenzin')).toBe('TD');
  });

  // A single Tibetan or Chinese glyph does not read as an initial, so the caller
  // shows a generic person icon instead.
  it('returns null for a name in a non-Latin script', () => {
    expect(getInitials('བསོད་ནམས', 'sonam')).toBeNull();
    expect(getInitials('王小明', 'wang')).toBeNull();
  });

  it('returns null when there is neither a name nor a username', () => {
    expect(getInitials(null, null)).toBeNull();
    expect(getInitials('', '  ')).toBeNull();
  });
});

describe('resolveHeaderLanguages', () => {
  it('maps codes to their native names, in the order given', () => {
    expect(resolveHeaderLanguages(['fr', 'bo', 'en'])).toEqual([
      { code: 'fr', native: 'Français' },
      { code: 'bo', native: 'བོད་ཡིག' },
      { code: 'en', native: 'English' },
    ]);
  });

  it('accepts the { code, name } objects the config API sends', () => {
    expect(resolveHeaderLanguages([{ code: 'fr', name: 'Français' }])).toEqual([
      { code: 'fr', native: 'Français' },
    ]);
  });

  // The platform's own names carry an English gloss; the menu shows native names only.
  it('ignores the name the config API sends', () => {
    const [tibetan] = resolveHeaderLanguages([{ code: 'bo', name: 'བོད་ཡིག (Tibetan)' }]);
    expect(tibetan.native).toBe('བོད་ཡིག');
  });

  it('falls back to the built-in codes when the platform sends nothing', () => {
    const expected = FALLBACK_LANGUAGE_CODES.length;
    expect(resolveHeaderLanguages(undefined)).toHaveLength(expected);
    expect(resolveHeaderLanguages(null)).toHaveLength(expected);
    expect(resolveHeaderLanguages([])).toHaveLength(expected);
    expect(resolveHeaderLanguages('not a list')).toHaveLength(expected);
  });

  it('normalises casing and whitespace, and drops duplicates', () => {
    expect(resolveHeaderLanguages([' ES-419 ', 'es-419'])).toEqual([
      { code: 'es-419', native: 'Español (Latinoamérica)' },
    ]);
  });

  it('skips entries with no usable code', () => {
    expect(resolveHeaderLanguages(['fr', null, { name: 'no code' }, '  '])).toEqual([
      { code: 'fr', native: 'Français' },
    ]);
  });

  // A language the operator released has to appear even if this build predates it.
  it('still lists a code it has no native name for', () => {
    const [row] = resolveHeaderLanguages(['xx-yy']);
    expect(row.code).toBe('xx-yy');
    expect(row.native).toBeTruthy();
  });
});

describe('matchActiveLanguage', () => {
  const languages = [
    { code: 'en' }, { code: 'es-419' }, { code: 'zh-cn' }, { code: 'fr' },
  ];

  it('matches a code exactly', () => {
    expect(matchActiveLanguage('es-419', languages)).toBe('es-419');
  });

  it('is case and whitespace insensitive', () => {
    expect(matchActiveLanguage('  ES-419 ', languages)).toBe('es-419');
  });

  it('matches a regional locale against the bare code on offer', () => {
    expect(matchActiveLanguage('fr-ca', languages)).toBe('fr');
  });

  it('matches a bare locale against the regional code on offer', () => {
    expect(matchActiveLanguage('es', languages)).toBe('es-419');
  });

  it('does not match a different region of the same language', () => {
    expect(matchActiveLanguage('zh-tw', [{ code: 'zh-cn' }])).toBe('zh-cn');
    expect(matchActiveLanguage('zh-tw', [{ code: 'en' }])).toBeNull();
  });

  // Better to tick nothing than to claim the visitor asked for English.
  it('returns null when nothing plausibly matches', () => {
    expect(matchActiveLanguage('bo', languages)).toBeNull();
    expect(matchActiveLanguage('', languages)).toBeNull();
    expect(matchActiveLanguage(null, languages)).toBeNull();
    expect(matchActiveLanguage('fr', [])).toBeNull();
  });
});

describe('readLanguageCookie', () => {
  const COOKIE = 'openedx-language-preference';

  afterEach(() => {
    document.cookie = `${COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = 'other=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  });

  it('reads the stored preference', () => {
    document.cookie = `${COOKIE}=fr`;
    expect(readLanguageCookie(COOKIE)).toBe('fr');
  });

  it('finds the cookie among others', () => {
    document.cookie = 'other=something';
    document.cookie = `${COOKIE}=zh-cn`;
    expect(readLanguageCookie(COOKIE)).toBe('zh-cn');
  });

  it('decodes and lowercases the value', () => {
    document.cookie = `${COOKIE}=${encodeURIComponent('ES-419')}`;
    expect(readLanguageCookie(COOKIE)).toBe('es-419');
  });

  it('returns null when nothing is stored, or no name is given', () => {
    expect(readLanguageCookie(COOKIE)).toBeNull();
    expect(readLanguageCookie(undefined)).toBeNull();
  });
});
