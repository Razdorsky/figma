// Figma PR in Spanish (es-LA, owner 2026-11-10; docs/figma-spanish.md). English is the source; Spanish is a
// dictionary keyed by the English text, so a changed English string shows up as untranslated in the coverage check
// (scripts/spanish-strings.mjs) instead of going stale.
import es from './content/es.json';

export type Locale = 'en' | 'es';
const dictionary = es as Record<string, string>;

/** The text in the reader's language. */
export const tr = (locale: Locale | undefined, text: string) => (locale === 'es' && text ? dictionary[text] ?? text : text);

/** Marks an English literal kept in data (footer labels, menu titles) for the coverage check; it returns it as is. */
export const msg = (text: string) => text;

/** The other language, for the EN | ES switch. */
export const other = (locale: Locale): Locale => (locale === 'es' ? 'en' : 'es');
