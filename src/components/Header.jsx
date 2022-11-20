import styles from "~/utils/styles/header.module.scss";
import UserOptions from "./subcomponents/UserOptions";

export default function Header({ children, className }) {
  return (
    <header className={`${className} ${styles.header ?? ""}`.trim()}>
      {children}
      <UserOptions />
    </header>
  );
}
