import { useSelector } from "react-redux";
import { MyDate } from "../utils/Converter";
import HandleImage from "./HandleImage";
import Homepage from "./subcomponents/Homepage";
import Paragraph from "./subcomponents/Paragraph";
import Popularity from "./subcomponents/Popularity";

export default function PersonDetails({ data }) {
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
      <div className="banner">
        <HandleImage
          data={{ profile_path }}
          img_required="profile"
          is_person={true}
        />

        <div className="titles">
          <h1>{name}</h1>
        </div>
      </div>

      <div className="details">
        <Paragraph param={biography} />

        {also_known_as?.length ? (
          <dl>
            <dt className="subtitle">Conocido también cómo</dt>
            {also_known_as.map((e, i) => (
              <dd className="subtext" key={i}>
                {e}
              </dd>
            ))}
          </dl>
        ) : null}

        {known_for_department ? (
          <dl>
            <dt className="subtitle">Conocido por el campo de</dt>
            <dd className="subtext">{known_for_department}</dd>
          </dl>
        ) : null}

        {known_for?.length ? (
          <dl>
            <dt className="subtitle">Conocid@ por</dt>
            {known_for.map((e, i) => (
              <dd className="subtext" key={i}>
                {e.name ? e.name : e.title}
              </dd>
            ))}
          </dl>
        ) : null}

        <Popularity param={popularity} />

        {place_of_birth ? (
          <dl>
            <dt className="subtitle">Lugar de nacimiento</dt>
            <dd className="subtext">{place_of_birth}</dd>
          </dl>
        ) : null}

        <dl>
          <dt className="subtitle">Fecha de nacimiento</dt>
          <dd className="subtext">{MyDate(birthday)}</dd>
        </dl>

        {deathday ? (
          <dl>
            <dt className="subtitle">Fecha de fallecimiento</dt>
            <dd className="subtext">{deathday}</dd>
          </dl>
        ) : null}

        <Homepage param={homepage} />
      </div>
    </>
  );
}
