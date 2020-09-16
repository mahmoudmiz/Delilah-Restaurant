import React from "react";
import Register from "./components/auth/register/register";
import HomePage from "./pages/homePage";
import Login from "./components/auth/login/login";
import Orderspage from "./pages/orderspage";
import Addproductpage from "./pages/addproductpage";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import isLogedIn from "./helpers/isLogedIn";
import "./App.css";

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogedIn() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>

          <PrivateRoute exact path="/addproduct">
            <Addproductpage />
          </PrivateRoute>
          <PrivateRoute exact path="/">
            <HomePage />
          </PrivateRoute>

          <PrivateRoute path="/orders">
            <Orderspage />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
