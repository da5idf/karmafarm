import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import * as sessionActions from "./store/session";
import SplashPage from "./components/SplashPage";
import LoginForm from "./components/LoginForm";
import HomePage from "./components/Homepage";
import NewOrder from "./components/NewOrder";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const rootView = (
    user ?
      <>
        <Navigation isLoaded={isLoaded} />
        <HomePage />
      </>
      :
      <SplashPage />
  )

  return (
    <>
      <div id="app-hero">
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              {rootView}
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="/restaurants/:restaurantId/orders/new">
              <Navigation />
              <NewOrder />
            </Route>
          </Switch>
        )}
      </div>
    </>
  );
}

export default App;