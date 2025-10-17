import { formatDateOption } from "../../consts";
import { useLanguage } from "../../contexts/LanguageContext";

interface DateRangeProps {
  readonly startDate: string;
  readonly endDate: string | null;
}

const DateRange: React.FC<DateRangeProps> = (props: DateRangeProps) => {
  const { t, lang } = useLanguage();

  const start: string = new Date(props.startDate).toLocaleDateString(
    lang,
    formatDateOption
  );
  const end: string = props.endDate
    ? new Date(props.endDate).toLocaleDateString(lang, formatDateOption)
    : t("today");

  return (
    <span>
      <time dateTime={props.startDate}>{start}</time>
      {start !== end && (
        <>
          {" "}
          - <time dateTime={props.endDate || new Date().toString()}>{end}</time>
        </>
      )}
    </span>
  );
};

export default DateRange;
