import { useLocation, Route, Switch } from "wouter";
import { useEffect } from "react";
import "../helpers/styles/General.scss";
import Films from "./Films";
import SelectedFilm from "./SelectedFilm";
import StoreProvider from "../providers/StoreProvider";

const App = () => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setLocation("/home");
  }, []);

  return (
    <StoreProvider>
      <Switch>
        <Route path="/home" component={Films} />
        <Route path="/home/details" component={SelectedFilm} />
      </Switch>
    </StoreProvider>
  );
};

export default App;
