import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";

import Landing from "./components/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/Dashboard";
import AllWorkouts from "./components/activities/AllWorkouts";
import ActivityDetails from "./components/activities/ActivityDetails";
import PrivateRoute from "./components/PrivateRoute";

//Keep user logged in if has valid token
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decoded = jwt_decode(token);
  //Set user and is Authenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  if (Date.now() >= decoded.exp * 1000) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/allworkouts" component={AllWorkouts} />
            <PrivateRoute
              exact
              path="/activity/:id"
              component={ActivityDetails}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
