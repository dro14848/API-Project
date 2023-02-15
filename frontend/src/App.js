import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch,Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots";
import SpotSingle from "./components/Spot-Single";
import CreateSpot from "./components/Spot-Create";
import EditSpot from "./components/Spot-Edit";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
          <AllSpots />
          </Route>
          <Route exact path='/spots/:id'>
            <SpotSingle />
          </Route>
          <Route exact path = '/spots/:id/test'>
            <EditSpot />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;