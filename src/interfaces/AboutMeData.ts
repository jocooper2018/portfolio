import type { TranslatedString } from "../types/Language";
import type Image from "./Image";

export default interface AboutMeData {
  readonly aboutMe: {
    readonly paragraphs: TranslatedString[];
    readonly photo: Image;
  };
}
