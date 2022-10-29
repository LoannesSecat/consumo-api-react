import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as BookmarkSlash } from "~/assets/icons/bookmark-slash.svg";
import { ReactComponent as Bookmark } from "~/assets/icons/bookmark.svg";
import { ManipulateFavorites } from "~/services/UserServices";
import MyToast from "~/utils/MyToast";
import "~/utils/styles/SaveFavoriteButton.scss";

export default function SaveFavoriteButton({ mediaData }) {
  const [like, setLike] = useState(false);
  const { SESSION, FAVORITES } = useSelector((state) => state.user);
  const {
    id,
    media_type,
    name,
    title,
    popularity,
    poster_path,
    vote_average,
    vote_count,
    overview,
    backdrop_path,
    known_for_department,
    profile_path,
  } = mediaData;

  const IS_IN_FAVORITES = Object.values(FAVORITES)?.some((elm) => elm.id === id);
  const SAVED_FAV = Object.values(FAVORITES).find((elm) => id === elm.id);

  useEffect(() => {
    if (IS_IN_FAVORITES) {
      setLike(true);
    }
  }, [FAVORITES]);

  return (
    <button
      className="save-favorite-button"
      onClick={() => {
        if (SESSION) {
          if (like) {
            ManipulateFavorites({ type: "delete", data: SAVED_FAV });
          }

          if (!like) {
            ManipulateFavorites({
              type: "create",
              data: {
                id,
                media_type,
                title: title ?? name,
                popularity,
                poster_path,
                vote_average,
                vote_count,
                overview,
                backdrop_path,
                known_for_department,
                profile_path,
              },
            });
          }

          setLike(!like);
        }

        if (!SESSION) {
          MyToast.info({
            message: `Debes iniciar sesión para agregar <b>${title ?? name}</b> a favoritos`,
          });
        }
      }}
      title={like ? "Eliminar de favoritos" : "Agregar a favoritos"}
    >
      {like ? <BookmarkSlash /> : <Bookmark />}
    </button>
  );
}
