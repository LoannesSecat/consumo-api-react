import UserOptions from "./../user-options";
import styles from "./header.module.scss";

export default function Header({ children, className }) {
  return (
    <header className={`${className} ${styles.header ?? ""}`.trim()}>
      {children}
      <UserOptions />
    </header>
  );
}
