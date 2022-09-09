import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Route, Switch } from "wouter";
import Alert from "./components/Alert";
import Details from "./pages/Details";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import StoreProvider from "./providers/StoreProvider";
import { ReadResources } from "./redux/actions/MediaActions";
import "./utils/styles/General.scss";

function App() {
  useEffect(() => {
    ReadResources();
  }, []);

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

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
