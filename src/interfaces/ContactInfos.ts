import type Icon from "./Icon";

export default interface ContactInfos {
  readonly name: string;
  readonly url: string;
  readonly urlText: string;
  readonly icon: Icon;
}
