import type { TranslatedString } from "../types/Language";

export default interface Image {
  readonly url: string;
  readonly alt: TranslatedString;
}
