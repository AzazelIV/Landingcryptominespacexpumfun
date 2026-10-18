import en from "@/messages/en.json"
import es from "@/messages/es.json"
export const dictionaries = { en, es } as const
export type Locale = keyof typeof dictionaries
export function getDictionary(locale: Locale) { return dictionaries[locale] }
