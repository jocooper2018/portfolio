import type { TranslatedString } from "../types/Language";

export default interface PersonalInfosData {
  readonly personalInfos: {
    readonly name: string;
    readonly firstName: string;
    readonly status: TranslatedString;
    readonly pitch: TranslatedString;
  };
}
