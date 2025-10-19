import type { TranslatedString } from "../types/Language";
import type ButSkill from "./ButSkill";
import type Image from "./Image";

export default interface Project {
  readonly name: string;
  readonly startDate: string;
  readonly endDate: string | null;
  readonly description: TranslatedString;
  readonly toolsIds: string[];
  readonly butSkills: ButSkill[];
  readonly images: Image[];
}
