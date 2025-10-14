import type { TranslatedString } from "../types/Language";
import type Tool from "./Tool";

export default interface Skill {
  readonly name: TranslatedString;
  readonly description: TranslatedString;
  readonly tools: Tool[];
}
