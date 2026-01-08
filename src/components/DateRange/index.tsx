/*
 *  A personal portfolio website to showcase projects.
 *  Copyright (C) 2026  Matthieu LE BOUT
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import "./index.css";
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
    <span className="date-range">
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
