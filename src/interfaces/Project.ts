import type Tool from "./Tool";

export default interface Project {
  readonly name: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly description: string;
  readonly tools: Tool[];
  readonly butSkills: string[];
}
