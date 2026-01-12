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
import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import CloseIcon from "../../assets/icons/CloseIcon";
import type Project from "../../interfaces/Project";

interface ImageViewerProps {
  readonly project: Project | undefined;
  readonly setProject: React.Dispatch<
    React.SetStateAction<Project | undefined>
  >;
}

const ImagesViewer: React.FC<ImageViewerProps> = (props: ImageViewerProps) => {
  const { t, lang } = useLanguage();

  const [imageIndex, setImageIndex] = useState<number>(0);

  const close = () => {
    setImageIndex(0);
    props.setProject(undefined);
  };

  const nextImage = () => {
    if (props.project === undefined || props.project.images.length === 0) {
      return;
    }
    setImageIndex((imageIndex + 1) % props.project.images.length);
  };

  const previousImage = () => {
    if (props.project === undefined || props.project.images.length === 0) {
      return;
    }
    let newIndex: number = imageIndex - 1;
    if (newIndex < 0) {
      newIndex = props.project.images.length - 1;
    }
    setImageIndex(newIndex);
  };

  if (props.project === undefined || props.project.images.length === 0) {
    return;
  }

  return (
    <div className="images-viewer">
      <div className="image-container">
        <button type="button" className="close" onClick={close}>
          <CloseIcon />
        </button>
        <button type="button" className="previous" onClick={previousImage}>
          &lt;
        </button>
        <button type="button" className="next" onClick={nextImage}>
          &gt;
        </button>
        <img
          src={props.project.images[imageIndex].url}
          alt={props.project.images[imageIndex].alt[lang]}
          title={props.project.images[imageIndex].title[lang]}
          className="project-image"
        />
        <div className="current-index">
          {imageIndex + 1} / {props.project.images.length}
        </div>
      </div>
      <div className="image-description">
        <article>
          <h3>{props.project.name[lang]}</h3>
          <p>{props.project.description[lang]}</p>
        </article>
        <article>
          <h4>
            {props.project.images[imageIndex].title[lang] === ""
              ? t("untitled")
              : props.project.images[imageIndex].title[lang]}
          </h4>
          <p>
            {props.project.images[imageIndex].description[lang] === ""
              ? t("noDescription")
              : props.project.images[imageIndex].description[lang]}
          </p>
        </article>
      </div>
    </div>
  );
};

export default ImagesViewer;
