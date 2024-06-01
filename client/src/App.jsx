import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./shared/Navigation/Navbar";
import Home from "./pages/Home";
import AddLocation from "./components/Forms/LocationForms/AddLocationForm";
import LocationList from "./pages/locations/LocationList";
import LocationDetails from "./pages/locations/LocationDetails";
import ErrorPage from "./pages/ErrorPage";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import SignOut from "./pages/auth/SignOut";
import GuideSignUp from "./pages/auth/GuideSignUp";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/add-location" element={<AddLocation />} />
        <Route exact path="/locations" element={<LocationList />} />
        <Route exact path="/locations/:id" element={<LocationDetails />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/signout" element={<SignOut />} />
        <Route exact path="/guide-signup" element={<GuideSignUp />} />
        <Route
          exact
          path="*"
          element={<ErrorPage errorTitle={"Stranica nije pronadjena"} errorContent={"Ne mozemo pronaci stranicu koju trazite."} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
