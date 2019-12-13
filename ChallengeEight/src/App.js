import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

import SignIn from "./Components/HOC/Login";
import Dashboard from "./Components/HOC/Dashboard";
import Header from "./Components/Layout/Header";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { UserIsNotAuthenticated } from "./helpers/auth";

import store, { rrfProps } from "./Store";

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <Header />
          <Route exact path={"/"} component={Dashboard} />
          <Route path={"/signin"} component={UserIsNotAuthenticated(SignIn)} />
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
