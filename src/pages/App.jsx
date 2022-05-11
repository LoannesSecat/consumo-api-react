import { useLocation, Route, Switch } from "wouter";
import { useEffect } from "react";
import "@/utils/styles/General.scss";
import Films from "./Films";
import SelectedFilm from "./SelectedFilm";
import StoreProvider from "@/providers/StoreProvider";
import { ReadFilms } from "@/actions/FilmActions";

const App = () => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    ReadFilms();
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
