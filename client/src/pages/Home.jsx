import React from "react";
import Button from "../shared/UIElements/Button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center mt-32 p-4 sm:mt-60 max-h-screen bg-gray-100 ">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-center">Dobrodošli na SarajevoQR!</h1>
      <h3 className="text-lg sm:text-xl uppercase font-medium text-gray-600 mb-8 text-center">
        <span className="text-orange-500">Otkrijte</span> skrivene bisere Sarajeva <span className="text-orange-500">uz</span> jednostavno
        <span className="text-orange-500"> skeniranje</span>.
      </h3>
      <p className="max-w-3xl text-center text-gray-700 font-mont font-medium">
        Naša web stranica pruža trenutni pristup informacijama o različitim lokacijama u Sarajevu putem QR kodova. Istražite bogatu povijest, kulturne
        znamenitosti i živahne atrakcije ovog predivnog grada skeniranjem QR kodova postavljenih na različitim lokacijama. Uronite u očaravajuće priče
        i otkrijte tajne Sarajeva.
      </p>
      <Link to="/locations">
        <Button className={`mt-8`}>Istražite Lokacije</Button>
      </Link>
    </div>
  );
};

export default Home;
