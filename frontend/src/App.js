import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import * as sessionActions from "./store/session";
import LoginForm from "./components/LoginForm";
import NewOrder from "./components/NewOrder";
import RootView from "./components/RootView";
import SingleOrder from "./components/SingleOrder";
import Cart from "./components/Cart";
import OrderParent from "./components/OrderParent/OrderParent";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div id="app-hero">
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              <RootView user={user} isLoaded={isLoaded} />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path="/orders/:orderId">
              <Navigation />
              <OrderParent />
            </Route>
          </Switch>
        )}
      </div>
    </>
  );
}

export default App;