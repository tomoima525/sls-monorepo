import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import { getSession } from "./utils";
import Auth from "./pages/Auth/Auth";
import Content from "./pages/Content/Content";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/login" component={Auth} />
        <PrivateRoute path="/content" component={Content} />
        <PrivateRoute exact path="/" component={Dashboard} />
      </Switch>
    </Router>
  );
};

/**
 * A component to protect routes.
 * Shows Auth page if the user is not authenticated
 */
const PrivateRoute = ({ component, ...options }) => {
  const session = getSession();
  const finalComponent = session ? component : Home;
  return <Route {...options} component={finalComponent} />;
};

export default App;
