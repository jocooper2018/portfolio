import type { TranslatedString } from "../types/Language";
import type ButSkill from "./ButSkill";
import type Tool from "./Tool";

export default interface Project {
  readonly name: string;
  readonly startDate: string;
  readonly endDate: string | null;
  readonly description: TranslatedString;
  readonly tools: Tool[];
  readonly butSkills: ButSkill[];
}
