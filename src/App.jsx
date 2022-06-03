import StoreProvider from "./providers/StoreProvider";
import Alert from "./components/Alert";
import Home from "./pages/Home";
import Details from "./pages/Details";
import PageNotFound from "./pages/PageNotFound";
import { Route, Switch } from "wouter";
import "./utils/styles/General.scss";

export default function App() {
  console.log("Preview!!!");
  return (
    <StoreProvider>
      <Alert />

      <Switch>
        <Route path="/" component={Home} />
        <Route path="/details" component={Details} />
        <Route path="/:unknownPage*" component={PageNotFound} />
      </Switch>
    </StoreProvider>
  );
}
