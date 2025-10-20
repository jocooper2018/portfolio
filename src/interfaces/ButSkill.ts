import type { TranslatedString } from "../types/Language";

export default interface ButSkill {
  readonly id: number;
  readonly fullName: TranslatedString;
  readonly shortName: TranslatedString;
}
