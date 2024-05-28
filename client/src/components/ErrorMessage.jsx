import React from "react";
import Button from "../shared/UIElements/Button";
import { Link } from "react-router-dom";

const ErrorMessage = ({ errorTitle, errorContent }) => {
  return (
    <div className="w-full m-auto">
      <div className="text-center">
        <h1 className="text-3xl py-6">{errorTitle}</h1>
        <div className="font-semibold text-normal sm:text-xl mt-3 text-slate-700 mb-6">{errorContent}</div>
        <div className="text-center">
          <Link to="/">
            <Button>Nazad na početnu</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
