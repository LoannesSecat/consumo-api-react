import "~/utils/styles/Header.scss";
import UserOptions from "./subcomponents/UserOptions";

export default function Header({ children }) {
  return (
    <header className="header">
      {children}
      <UserOptions />
    </header>
  );
}
