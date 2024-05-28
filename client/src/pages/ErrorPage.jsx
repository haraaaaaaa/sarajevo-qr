import React from "react";
import Button from "../shared/UI/Button";
import { NavLink } from "react-router-dom";

const ErrorPage = ({ errorTitle, errorContent }) => {
  return (
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2  p-2 text-center">
      <h1 className="font-semibold text-2xl sm:text-3xl text-slate-900">{errorTitle}</h1>
      <div className="font-semibold  text-normal sm:text-xl  mt-3 text-slate-700 mb-6">{errorContent}</div>
      <Button>
        <NavLink to="/">Početna</NavLink>
      </Button>
    </div>
  );
};

export default ErrorPage;
