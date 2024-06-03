import React, { useState } from "react";
import axios from "axios";
import Button from "../../../shared/UIElements/Button";
import { useAuth } from "../../../context/AuthContext";

const AddLocationForm = () => {
  const { token } = useAuth();
  console.log(token);

  const [formData, setFormData] = useState({
    name: "",
    summary: "",
    description: "",
    image: "",
  });

  const clearFormData = () => {
    setFormData({
      name: "",
      summary: "",
      description: "",
      image: "",
    });
  };

  const { name, summary, description, image } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/locations", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      clearFormData();
      navigate("/locations");
    } catch (error) {
      console.error("Error whilst trying to save locations: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-16 max-w-md mx-auto bg-white p-4 shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-6 my-5 text-center text-gray-800">Dodavanje lokacije</h1>
      <input
        type="text"
        placeholder="Naziv"
        name="name"
        value={name}
        onChange={handleChange}
        autoComplete="off"
        className="block w-full border-gray-300 border-solid border-b-2 p-2 mb-4 focus:outline-none focus:border-orange-600"
      />

      <input
        type="text"
        placeholder="Kratki opis"
        name="summary"
        value={summary}
        onChange={handleChange}
        autoComplete="off"
        className="block w-full border-gray-300 border-solid border-b-2 p-2 mb-4 focus:outline-none focus:border-orange-600"
      />

      <textarea
        placeholder="Detaljan opis"
        name="description"
        value={description}
        onChange={handleChange}
        autoComplete="off"
        className="block w-full border-gray-300 border-solid border-b-2 p-2 mb-4 focus:outline-none focus:border-orange-600"
      ></textarea>

      <input
        type="text"
        placeholder="Slika"
        name="image"
        value={image}
        onChange={handleChange}
        autoComplete="off"
        className="block w-full border-gray-300 border-solid border-b-2 p-2 mb-4 focus:outline-none focus:border-orange-600"
      />

      <Button type="submit">Dodaj lokaciju</Button>
    </form>
  );
};

export default AddLocationForm;
