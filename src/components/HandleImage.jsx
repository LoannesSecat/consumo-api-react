import { useEffect } from "react";
import photo from "~/assets/icons/photo.svg";
import { TMDb } from "~/utils/Parameters";
import styles from "~/utils/styles/handle-image.module.scss";

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
      rootMargin: "300px",
      threshold: 0,
    },
  );

  useEffect(() => {
    const IMG = document.querySelectorAll(`.${styles.img}`);

    IMG.forEach((elm) => {
      OBSERVER.observe(elm);
    });
  }, [OBSERVER]);

  return (
    <img
      data-src={URL}
      className={`${styles.img}`}
      alt={alt || "Imagen"}
      onLoad={(evt) => {
        const { target } = evt;

        target.className = CLASSNAME;
      }}
    />
  );
}
