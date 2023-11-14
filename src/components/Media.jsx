import { useEffect } from "react";
import styles from "~/utils/styles/media.module.scss";
import Empty from "./Empty";
import CardMedia from "./subcomponents/CardMedia";

export default function Media({ data, page, readMedia }) {
  useEffect(() => {
    readMedia();
  }, [page])

  if (data?.length) {
    return (
      <main className={styles.media}>
        {
          data.map((element) => {
            return (
              <CardMedia
                key={element.id}
                data={element}
              />
            )
          })
        }
      </main>
    );
  }

  return <Empty />;
}
