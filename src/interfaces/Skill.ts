import type Tool from "./Tool";

export default interface Skill {
  readonly name: string;
  readonly description: string;
  readonly tools: Tool[];
}
