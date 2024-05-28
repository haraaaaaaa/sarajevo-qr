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
        <Route path="/" exact element={<Home />} />
      </Switch>
    </Router>
  );
};

export default App;
