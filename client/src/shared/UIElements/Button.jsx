import React from "react";

const Button = ({ children, className, type, onClick }) => {
  return (
    <button
      type={type ? type : "button"}
      className={`
      bg-orange-500 text-white sm:w-auto px-5 py-2.5 rounded-lg
      focus:ring-4 focus:ring-blue-300 focus:outline-none 
       hover:bg-orange-600 font-semibold ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
