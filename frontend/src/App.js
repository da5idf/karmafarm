import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import * as sessionActions from "./store/session";
import LoginForm from "./components/LoginForm";
import RootView from "./components/RootView";
import OrderParent from "./components/OrderParent/OrderParent";
import AddProduct from "./components/AddProduct";
import About from "./components/About/About";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import RestaurantSignUp from "./components/SignupFormPage/RestaurantSignUp";
import Reports from "./components/Reports";
// import Chat from "./components/Chat";
import { UpdateMessages } from "./components/UpdateMessage";

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
              <SignupFormPage sessionUser={user} />
            </Route>
            <ProtectedRoute path="/restaurant/signup">
              <RestaurantSignUp user={user} />
            </ProtectedRoute>
            <ProtectedRoute exact path="/orders/:orderId">
              <Navigation />
              <OrderParent />
            </ProtectedRoute>
            <ProtectedRoute exact path="/products">
              <Navigation />
              <AddProduct user={user} />
            </ProtectedRoute>
            <ProtectedRoute exact path="/reports">
              <Navigation />
              <Reports user={user} />
            </ProtectedRoute>
            <ProtectedRoute exact path="/updates">
              <Navigation />
              <UpdateMessages />
            </ProtectedRoute>
            <ProtectedRoute exact path="/about">
              <Navigation />
              <About user={user} />
            </ProtectedRoute>
            <Route >
              <Navigation />
              <NotFound />
            </Route>
          </Switch>
        )
        }
      </div >
    </>
  );
}

export default App;