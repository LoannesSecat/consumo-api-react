import LoadingSVG from "~/icons/loading.svg?react";
import styles from "./loading-screen.module.scss";

export default function Loading() {
  return (
    <div className={styles.loading_screen}>
      <LoadingSVG />
    </div>
  );
}
