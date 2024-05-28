import React, { useState } from "react";
import axios from "axios";
import Button from "../shared/UI/Button";

const LocationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    summary: "",
    description: "",
    image: "",
  });

  const { name, summary, description, image } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/locations", formData);
      setFormData({
        name: "",
        summary: "",
        description: "",
        image: "",
      });
    } catch (error) {
      console.error("Error whilst trying to save locations: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-16 max-w-md mx-auto bg-white p-4 shadow-md rounded-md">
      <input
        type="text"
        placeholder="Naziv"
        name="name"
        value={name}
        onChange={handleChange}
        autoComplete="off"
        className="block w-full border-gray-300 border-solid border-b-2 p-2 mb-4 focus:outline-none focus:border-blue-500"
      />

      <input
        type="text"
        placeholder="Kratki opis"
        name="summary"
        value={summary}
        onChange={handleChange}
        autoComplete="off"
        className="block w-full border-gray-300 border-solid border-b-2 p-2 mb-4 focus:outline-none focus:border-blue-500"
      />

      <textarea
        placeholder="Detaljan opis"
        name="description"
        value={description}
        onChange={handleChange}
        autoComplete="off"
        className="block w-full border-gray-300 border-solid border-b-2 p-2 mb-4 focus:outline-none focus:border-blue-500"
      ></textarea>

      <input
        type="text"
        placeholder="Slika"
        name="image"
        value={image}
        onChange={handleChange}
        autoComplete="off"
        className="block w-full border-gray-300 border-solid border-b-2 p-2 mb-4 focus:outline-none focus:border-blue-500"
      />

      <Button type="submit">Dodaj lokaciju</Button>
    </form>
  );
};

export default LocationForm;
