import styles from "~/utils/styles/empty.module.scss";

export default function Empty() {
  return (
    <div className={styles.empty}>
      <h1>No hay nada para mostrar</h1>
    </div>
  );
}
