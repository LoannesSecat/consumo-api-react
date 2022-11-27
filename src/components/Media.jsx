import { useSuperState } from "@superstate/react";
import MediaC from "~/superstate/Media";
import styles from "~/utils/styles/media.module.scss";
import Empty from "./Empty";
import CardMedia from "./subcomponents/CardMedia";

export default function Media() {
  useSuperState(MediaC.state);
  const { RESOURCES } = MediaC.state.now();

  if (Object?.keys(RESOURCES)?.length) {
    return (
      <main className={styles.media}>
        {
          Object.values(RESOURCES)?.map((element) => (
            <CardMedia
              key={element.id}
              data={element}
            />
          ))
        }
      </main>
    );
  }

  return <Empty />;
}
