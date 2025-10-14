import type { TranslatedString } from "../types/Language";

export default interface Training {
  readonly schoolName: TranslatedString;
  readonly certificateName: TranslatedString;
  readonly specialty: TranslatedString;
  readonly description: TranslatedString;
  readonly startDate: string;
  readonly endDate: string;
  readonly url: string;
}
