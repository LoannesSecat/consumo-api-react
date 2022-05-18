import { useLocation, Route, Switch } from "wouter";
import { useEffect } from "react";
import "@/utils/styles/General.scss";
import Films from "./Films";
import SelectedFilm from "./SelectedFilm";
import PageNotFound from "./PageNotFound";
import StoreProvider from "@/providers/StoreProvider";
import { ReadFilms } from "@/actions/FilmActions";
import Alert from "@/components/Alert";

const App = () => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    ReadFilms();
    setLocation("/home");
  }, []);

  return (
    <StoreProvider>
      <Alert />
      <Switch>
        <Route path="/home" component={Films} />
        <Route path="/home/details" component={SelectedFilm} />
        <Route path="" component={PageNotFound} />
      </Switch>
    </StoreProvider>
  );
};

export default App;
