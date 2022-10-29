import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as Heart } from "~/assets/icons/heart.svg";
import { ReactComponent as Sparkles } from "~/assets/icons/sparkles.svg";
import { ReactComponent as UserGroup } from "~/assets/icons/user-group.svg";
import Empty from "~/components/Empty";
import HandleImage from "~/components/HandleImage";
import Header from "~/components/Header";
import GoBackButton from "~/components/subcomponents/GoBackButton";
import SaveFavoriteButton from "~/components/subcomponents/SaveFavoriteButton";
import "~/utils/styles/UserFavorites.scss";
import Translations from "~/utils/Translations.json";

export default function UserFavorites() {
  const { FAVORITES } = useSelector((state) => state.user);
  const [filterData, setFilterData] = useState(FAVORITES);

  const KnownFor = (value) => {
    if (value && Translations.knownForDepartment[value]) {
      return Translations.knownForDepartment[value].toLowerCase();
    }

    return value;
  };

  const HandleOnChange = (evt) => {
    const TEXT = evt.target.value.trim();
    const DATA = Object.values(FAVORITES).filter((elm) => {
      const TITLE = elm.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2")
        .normalize();
      const INPUT_TEXT = TEXT
        .toLowerCase()
        .normalize("NFD")
        .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2")
        .normalize();

      return TITLE.includes(INPUT_TEXT);
    });

    setFilterData(DATA);
  };

  useEffect(() => {
    setFilterData(FAVORITES);
  }, [FAVORITES]);

  return (
    <main className="user-favorites">
      <Header>
        <GoBackButton />

        <input
          type="search"
          className="input-search"
          onChange={HandleOnChange}
        />
      </Header>

      {
        Object.keys(filterData).length
          ? (
            <section className="favorites-media">
              {
                Object.values(filterData).map((elm) => {
                  const {
                    vote_average,
                    media_type,
                    profile_path,
                    known_for_department,
                    popularity,
                    backdrop_path,
                    title,
                    overview,
                    vote_count,
                    id,
                  } = elm;

                  return (
                    <article key={id} className={`card ${elm.media_type}`}>
                      <SaveFavoriteButton mediaData={elm} />
                      {
                        media_type === "person"
                          ? (
                            <>
                              <HandleImage
                                size="w400"
                                url={profile_path}
                                className="img-person"
                                loading="lazy"
                              />

                              <h3 className="name">{title}</h3>

                              <span className="known">
                                Conocido por el campo de la
                                {" "}
                                {KnownFor(known_for_department)}
                              </span>

                              <div className="popularity" title="Popularidad">
                                <UserGroup />
                                {popularity}
                              </div>
                            </>
                          )
                          : (
                            <>
                              <HandleImage
                                className={`img-${elm.media_type}`}
                                url={backdrop_path}
                                loading="lazy"
                                size="w780"
                              />

                              <div>
                                <h3 className="title">{title}</h3>
                                <small className="media-type">{Translations.MediaType[media_type]}</small>
                              </div>

                              {overview?.length ? <p className="overview">{overview}</p> : null}

                              <div className="statistics">
                                {popularity
                                  ? (
                                    <div title="Popularidad" className="popularity">
                                      <UserGroup />
                                      <span>{popularity}</span>
                                    </div>
                                  )
                                  : null}

                                {vote_average
                                  ? (
                                    <div title="Votación promedio" className="vote-average">
                                      <Sparkles />
                                      <span>{vote_average}</span>
                                    </div>
                                  )
                                  : null}

                                {vote_count
                                  ? (
                                    <div title="Me gusta" className="vote-count">
                                      <Heart />
                                      <span>{vote_count}</span>
                                    </div>
                                  )
                                  : null}
                              </div>
                            </>
                          )
                      }
                    </article>
                  );
                })
              }
            </section>
          )
          : (<Empty />)
      }
    </main>
  );
}
