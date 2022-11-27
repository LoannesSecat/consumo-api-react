import { MyDate } from "~/utils/Converter";
import styles from "~/utils/styles/media-details.module.scss";
import HandleImage from "./HandleImage";
import Homepage from "./subcomponents/Homepage";
import Paragraph from "./subcomponents/Paragraph";
import Popularity from "./subcomponents/Popularity";

export default function PersonDetails({ data } = {} = {}) {
  const {
    profile_path,
    name,
    also_known_as,
    biography,
    homepage,
    known_for_department,
    known_for,
    birthday,
    deathday,
    place_of_birth,
    popularity,
  } = data;

  return (
    <>
      <article className={styles.banner}>
        <HandleImage
          url={profile_path}
          size="h632"
          className={{ style: styles.person_img, not_found: styles.img_not_found }}
          alt={`Imagen de ${name}`}
        />

        <div className={styles.titles}>
          <h2>{name}</h2>
        </div>
      </article>

      <article className={styles.info}>
        <Paragraph param={biography} />

        {also_known_as?.length ? (
          <dl>
            <dt className={styles.subtitle}>Conocido también cómo</dt>
            {also_known_as.map((e, i) => (
              <dd className={styles.subtext} key={i}>
                {e}
              </dd>
            ))}
          </dl>
        ) : null}

        {known_for_department ? (
          <dl>
            <dt className={styles.subtitle}>Conocido por el campo de</dt>
            <dd className={styles.subtext}>{known_for_department}</dd>
          </dl>
        ) : null}

        {known_for?.length ? (
          <dl>
            <dt className={styles.subtitle}>Conocid@ por</dt>
            {known_for.map((element) => (
              <dd className={styles.subtext} key={element.id}>
                {element.name ?? element.title}
              </dd>
            ))}
          </dl>
        ) : null}

        <Popularity
          param={popularity}
          className={{ sTitle: styles.subtitle, sText: styles.subtext }}
        />

        {place_of_birth ? (
          <dl>
            <dt className={styles.subtitle}>Lugar de nacimiento</dt>
            <dd className={styles.subtext}>{place_of_birth}</dd>
          </dl>
        ) : null}

        <dl>
          <dt className={styles.subtitle}>Fecha de nacimiento</dt>
          <dd className={styles.subtext}>{MyDate(birthday)}</dd>
        </dl>

        {deathday ? (
          <dl>
            <dt className={styles.subtitle}>Fecha de fallecimiento</dt>
            <dd className={styles.subtext}>{deathday}</dd>
          </dl>
        ) : null}

        <Homepage
          param={homepage}
          className={{
            sTitle: styles.subtitle,
            sText: styles.subtext,
            h: styles.homepage,
          }}
        />
      </article>
    </>
  );
}
