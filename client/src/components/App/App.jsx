import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import GameTable from "../GameTable/GameTable.jsx";
import Authorization from "../auth/Authorization.jsx";
import Registration from "../auth/Registration.jsx";
import Navbar from "../navbar/Navbar.jsx";
import Alert from "../alert/Alert.jsx";
import { token } from "../../redux/actions/userActions";
import "../../assets/scss/style.css";

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(token(currentUser.email));
  }, []);
 

  return (
    <div className="app">
      <Router>
        <Alert />
        <Navbar />

        {!isAuth ? (
          <Switch>
            <Route path="/registration" component={Registration} />
            <Route path="/" component={Authorization} />
            <Redirect to="/" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={GameTable} />
            <Redirect to="/" />
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
