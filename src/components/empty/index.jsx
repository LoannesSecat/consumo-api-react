import styles from "./empty.module.scss";

export default function Empty() {
  return (
    <main className={styles.empty}>
      <p className={styles.text_advice}>No hay nada para mostrar</p>
    </main>
  );
}
