import Image from "~/components/Image";
import { MyDate } from "~/utils/functions.js";
import Homepage from "../../../components/Homepage";
import Paragraph from "../../../components/Paragraph";
import Popularity from "../../../components/Popularity";
import styles from "../media-details.module.scss";

export default function PersonDetails({ data } = {} = {}) {
  const {
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
    backdrop_url,
  } = data;

  return (
    <>
      <picture className={styles.banner}>
        <Image
          src={backdrop_url}
          className={styles.person_img}
          alt={`Imagen de ${name}`}
        />

        <hgroup className={styles.titles}>
          <h1 className={styles.media_title}>{name}</h1>
        </hgroup>
      </picture>

      <section className={styles.info}>
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
      </section>
    </>
  );
}
