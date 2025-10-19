import type Icon from "./Icon";

export default interface Tool {
  readonly id: string;
  readonly name: string;
  readonly logo: Icon;
}
