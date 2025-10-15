import type { TranslatedString } from "../types/Language";

export default interface WorkExperience {
  readonly companyName: string;
  readonly post: TranslatedString;
  readonly type: TranslatedString;
  readonly location: TranslatedString;
  readonly startDate: string;
  readonly endDate: string | null;
}
