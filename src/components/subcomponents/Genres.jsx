import { Fragment } from "react";

export default function Genres({ param }) {
  if (param?.length)
    return (
      <div className="genres">
        {param?.map((e, i) => (
          <Fragment key={i}>
            <small>{e.name}</small>
          </Fragment>
        ))}
      </div>
    );

  return null;
}
