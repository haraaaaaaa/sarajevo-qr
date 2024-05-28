import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./shared/Navigation/Navbar";
import Home from "./pages/Home";
import AddLocation from "./components/Forms/LocationForms/AddLocation";
import LocationList from "./pages/locations/LocationList";
import LocationDetails from "./pages/locations/LocationDetails";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/add-location" exact>
          <AddLocation />
        </Route>
        <Route path="/locations" exact>
          <LocationList />
        </Route>
        <Route path="/locations/:id">
          <LocationDetails />
        </Route>
        <Route path="*">
          <ErrorPage errorTitle={"Stranica nije pronadjena"} errorContent={"Ne mozemo pronaci stranicu koju trazite."} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
