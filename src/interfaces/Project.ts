import type { TranslatedString } from "../types/Language";
import type Image from "./Image";

export default interface Project {
  readonly name: TranslatedString;
  readonly startDate: string;
  readonly endDate: string | null;
  readonly description: TranslatedString;
  readonly type: TranslatedString;
  readonly toolsIds: string[];
  readonly butSkillsIds: number[];
  readonly images: Image[];
}
