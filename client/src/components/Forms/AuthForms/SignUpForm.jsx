import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const { authUser } = useAuth();

  const navigate = useNavigate();

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearFormData = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords match before making the API call
    if (formData.password !== formData.confirmPassword) {
      setMessage("Lozinke se ne poklapaju.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/signup", formData);
      const { token, message } = response.data;
      authUser(token);
      setMessage(message);
      clearFormData();
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        // Check for the specific error message from the server
        if (error.response.data.message === "Korisničko ime je već u upotrebi!") {
          setUsernameError("Korisničko ime je već u upotrebi!"); // Set the username error message
        } else if (error.response.data.message === "E-mail adresa je već u upotrebi!") {
          setEmailError("E-mail adresa je već u upotrebi!"); // Set the email error message
        } else {
          setMessage(error.response.data.message); // Set the error message received from the server
        }
      } else {
        setMessage("Desila se greška, molimo pokušajte kasnije.");
      }
      console.error("Error while signing up: ", error);
    }
  };

  return (
    <div className="mx-2">
      <div className="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Sign Up</h1>

        {message && <div className="text-red-500 mb-4">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="username"
              id="username"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
              required
              autoComplete="off"
              onChange={handleInputChange}
              value={formData.username}
            />
            <label
              htmlFor="username"
              className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Korisničko ime
            </label>
            {usernameError && <div className="text-red-500 mb-4">{usernameError}</div>}
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
              required
              autoComplete="off"
              onChange={handleInputChange}
              value={formData.email}
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              E-mail adresa
            </label>
            {emailError && <div className="text-red-500 mb-4">{emailError}</div>}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
              required
              autoComplete="off"
              onChange={handleInputChange}
              value={formData.password}
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Lozinka
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
              required
              autoComplete="off"
              onChange={handleInputChange}
              value={formData.confirmPassword}
            />
            <label
              htmlFor="confirmPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Potvrdi lozinku
            </label>
          </div>

          <button
            type="submit"
            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
          >
            Kreiraj nalog
          </button>
          <p className="mt-4 text-gray-500 dark:text-gray-200">
            Već imaš nalog? Prijavi se{" "}
            <Link to={"/signin"}>
              {" "}
              <u> ovdje. </u>{" "}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
