import { useEffect } from "react";
import photoSVG from "~/icons/photo.svg";

const isUrlValid = (url) => {
  try {
    new URL(url);

    if (url.includes("undefined") || url.includes("null")) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
}

const parseParams = (params = {}) => {
  const paramsKeys = Object.entries(params);

  const parsedParams = paramsKeys
    .map(([key, values]) => {
      if (key.includes("-")) {
        const keyArray = key.split("-");
        const newKey = keyArray.map((keySection, index) => {
          return index >= 1
            ? keySection[0].toUpperCase() + keySection.slice(1)
            : keySection
        });

        return [newKey.join(""), values];
      }

      return [key, values];
    });

  return Object.fromEntries(parsedParams)
}

export default function Image(params) {
  const { dataSrc, ...restOfParams } = parseParams(params);

  // Intersection observer section ---
  const intersectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          if (target.getAttribute("data-src")) {
            target.setAttribute("src", target.getAttribute("data-src"));
            target.removeAttribute("data-src");
          }

          observer.unobserve(target);
        }
      });
    },
    {
      root: null,
      rootMargin: "300px 0px",
      threshold: 0,
    },
  )

  useEffect(() => {
    const img = document.querySelectorAll(`.${restOfParams.className}`);

    img.forEach((elm) => {
      intersectionObserver.observe(elm);
    });
  }, [intersectionObserver]);
  // ---

  return (
    <img
      {...(
        isUrlValid(dataSrc)
          ? { "data-src": dataSrc }
          : { src: photoSVG, style: { backgroundColor: "rgb(0 0 0 / 5%)" } }
      )}

      {...restOfParams}
    />
  );
}
