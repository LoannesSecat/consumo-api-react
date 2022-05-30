import StoreProvider from "./providers/StoreProvider";
import Alert from "./components/Alert";
import Home from "./pages/Home";
import Details from "./pages/Details";
import PageNotFound from "./pages/PageNotFound";
import { Route, Router, Switch } from "wouter";

import "./utils/styles/General.scss";

export default function App() {
  return (
    <StoreProvider>
      <Alert />

      <Router base="/movies-platform-react">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/details" component={Details} />
          <Route path="/:unknownPage*" component={PageNotFound} />
        </Switch>
      </Router>
    </StoreProvider>
  );
}
