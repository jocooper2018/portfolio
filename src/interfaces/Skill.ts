import type { TranslatedString } from "../types/Language";

export default interface Skill {
  readonly name: TranslatedString;
  readonly description: TranslatedString;
  readonly toolsIds: string[];
}
