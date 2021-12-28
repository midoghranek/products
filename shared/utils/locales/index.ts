import { arabic } from "./arabic";
import { english } from "./english";

export const locales: {
  readonly [lang: string]: { readonly [key: string]: string };
} = {
  en: english,
  ar: arabic,
};

type Locale = typeof english;
export type LOCALES = keyof Locale;
