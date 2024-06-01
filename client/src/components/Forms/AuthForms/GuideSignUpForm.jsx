import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../shared/UIElements/Button";

const GuideSignUpForm = () => {
  const { authUser } = useAuth();

  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearFormData = () => {
    setFormData({
      username: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/users/guide-signup", formData);
      const { token } = response.data;
      authUser(token);
      clearFormData();
      navigate("/");
    } catch (error) {
      handleServerError(error);
      console.error("Error while signing in:", error);
    }
  };

  const handleServerError = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      switch (error.response.data.message) {
        case "Korisnik sa tim korisničkim imenom ne postoji!":
          setMessage("Korisnik sa tim korisničkim imenom ne postoji!");
          break;

        default:
          setMessage(error.response.data.message);
      }
    } else {
      setMessage("Desila se greška, molimo pokušajte kasnije.");
    }
  };

  return (
    <div className="mx-2">
      <div className="max-w-sm mx-auto my-12 p-6 bg-white border border-gray-200 rounded-lg shadow ">
        <h1 className="text-3xl font-bold mb-6 my-5 text-center text-gray-800">Dodavanje vodiča</h1>

        {message && <div className="text-red-500 mb-4">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="username"
              id="username"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
              required
              autoComplete="off"
              onChange={handleInputChange}
              value={formData.username}
            />
            <label
              htmlFor="username"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Korisničko ime
            </label>
          </div>

          <Button type="submit">Dodaj vodiča</Button>
        </form>
      </div>
    </div>
  );
};

export default GuideSignUpForm;
