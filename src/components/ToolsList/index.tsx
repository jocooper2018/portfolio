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
import { useContext, useEffect, useRef, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import type Tool from "../../interfaces/Tool";
import getIconUrlForTheme from "../../utils/getIconUrlForTheme";
import getTool from "../../utils/getTool";
import { ThemeContext } from "../../contexts/ThemeContext";
import KeyboardArrowLeftIcon from "../../assets/icons/KeyboardArrowLeftIcon";
import KeyboardArrowRightIcon from "../../assets/icons/KeyboardArrowRightIcon";

interface ToolsListProps {
  readonly toolsIds: string[];
  readonly isToolsLoading: boolean;
  readonly everyTools: Tool[];
}

const ToolsList: React.FC<ToolsListProps> = (props: ToolsListProps) => {
  const { lang } = useLanguage();
  const { resolvedTheme } = useContext(ThemeContext);

  const ulRef = useRef<HTMLUListElement>(null);

  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);

  useEffect(() => {
    if (!ulRef.current) {
      return;
    }
    const checkOverflow = () => {
      if (!ulRef.current) {
        return;
      }
      setIsOverflowing(ulRef.current.scrollWidth > ulRef.current.clientWidth);
    };
    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(ulRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="tools-list">
      {isOverflowing && (
        <>
          <button
            type="button"
            className="left-button"
            onClick={() => {
              if (!ulRef.current) {
                return;
              }
              ulRef.current.scroll({
                left:
                  ulRef.current.scrollLeft -
                  ulRef.current.getBoundingClientRect().width / 2,
                behavior: "smooth",
              });
            }}
          >
            <KeyboardArrowLeftIcon />
          </button>
          <button
            type="button"
            className="right-button"
            onClick={() => {
              if (!ulRef.current) {
                return;
              }
              ulRef.current.scroll({
                left:
                  ulRef.current.scrollLeft +
                  ulRef.current.getBoundingClientRect().width / 2,
                behavior: "smooth",
              });
            }}
          >
            <KeyboardArrowRightIcon />
          </button>
        </>
      )}
      <ul ref={ulRef}>
        {props.toolsIds.map((toolId: string) => {
          if (props.isToolsLoading) {
            return <div className="loader"></div>;
          }
          const tool: Tool | undefined = getTool(props.everyTools, toolId);
          if (!tool) {
            throw new Error(`tool ${toolId} not found`);
          }
          return (
            <li key={`tool-${toolId}`}>
              <a href={tool.url[lang]} target="_blank">
                <img
                  src={getIconUrlForTheme(tool.logo, resolvedTheme)}
                  alt={tool.name}
                />
                <div className="popup">{tool.name}</div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ToolsList;
