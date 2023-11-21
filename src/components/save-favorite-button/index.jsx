import iziToast from "izitoast";
import { useEffect, useState } from "react";
import { ReactComponent as BookmarkSlash } from "~/assets/icons/bookmark-slash.svg";
import { ReactComponent as Bookmark } from "~/assets/icons/bookmark.svg";
import store from "~/store";
import styles from "./save-favorite-button.module.scss";

export default function SaveFavoriteButton({ dataToSave, ...restOfProps }) {
  const { favoriteMedia, isSessionActive, saveFavoriteMedia, deleteFavoriteMedia } = store.user();
  const [isSaved, setIsSaved] = useState(false);
  const { className } = restOfProps;

  useEffect(() => {
    const isInFavorites = favoriteMedia.some((elm) => elm?.id === dataToSave.id);
    setIsSaved(isInFavorites);
  }, [favoriteMedia]);

  const newClassName = [
    className,
    styles.save_favorite_button
  ].join(" ");

  return (
    <button
      className={newClassName}
      onClick={async () => {
        if (!await isSessionActive()) {
          const { title, name } = dataToSave;

          iziToast.info({
            message: `Debes iniciar sesión para agregar <strong>${title ?? name}</strong> a favoritos`,
          });
          return;
        }

        if (!isSaved) {
          await saveFavoriteMedia(dataToSave);
        }

        if (isSaved) {
          await deleteFavoriteMedia(dataToSave.id);
        }
      }}
      title={isSaved ? "Eliminar de favoritos" : "Agregar a favoritos"}
      type="button"
    >
      {isSaved ? <BookmarkSlash /> : <Bookmark />}
    </button>
  );
}
