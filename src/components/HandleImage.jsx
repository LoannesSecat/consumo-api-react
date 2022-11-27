import { useEffect } from "react";
import photo from "~/assets/icons/photo.svg";
import Parameters from "~/utils/Parameters";
import styles from "~/utils/styles/handle-image.module.scss";

const { TMDb } = Parameters;

export default function HandleImage({
  url, size, className, alt,
}) {
  const URL = url ? `${TMDb.url_img}${size}${url}` : photo;
  const CLASSNAME = url ? className.style : className.not_found;

  const OBSERVER = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((elm) => {
        const { target } = elm;

        if (elm.isIntersecting) {
          if (target.getAttribute("data-src")) {
            target.setAttribute("src", target.getAttribute("data-src")); // Assign data-src to src property
            target.removeAttribute("data-src"); // Remove data-src property
          }

          observer.unobserve(target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    },
  );

  useEffect(() => {
    const POSTER = document.querySelectorAll(`.${styles.poster_loading}`);
    const BACKDROP = document.querySelectorAll(`.${styles.backdrop_loading}`);

    POSTER.forEach((elm) => {
      OBSERVER.observe(elm);
    });

    BACKDROP.forEach((elm) => {
      OBSERVER.observe(elm);
    });
  }, [OBSERVER]);

  const sizeNum = parseInt(size.substring(1));

  return (
    <img
      data-src={URL}
      className={
        sizeNum > 1000
          ? styles.backdrop_loading
          : styles.poster_loading
      }
      alt={alt || "Imagen"}
      onLoad={(evt) => {
        const { target } = evt;

        target.className = `${CLASSNAME} ${styles.img}`;
      }}
    />
  );
}
