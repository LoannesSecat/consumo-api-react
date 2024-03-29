import { useEffect, useState } from "react";
import BookmarkSlash from "~/icons/bookmark-slash.svg?react";
import Bookmark from "~/icons/bookmark.svg?react";
import store from "~/store";
import { useToast } from "~/utils/functions";
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
      onClick={() => {
        (async () => {
          if (!await isSessionActive()) {
            const { title, name } = dataToSave;

            useToast.info({
              message: `Debes iniciar sesión para agregar <strong>"${title ?? name}"</strong> a favoritos`,
            });
            return;
          }

          if (!isSaved) {
            await saveFavoriteMedia(dataToSave);
          }

          if (isSaved) {
            await deleteFavoriteMedia(dataToSave);
          }
        })();
      }}
      title={isSaved ? "Eliminar de favoritos" : "Agregar a favoritos"}
      type="button"
    >
      {isSaved ? <BookmarkSlash /> : <Bookmark />}
    </button>
  );
}
