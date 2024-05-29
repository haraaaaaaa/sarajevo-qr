import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../shared/UIElements/Button";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/locations");
        const locationData = response.data;
        setLocations(locationData);
      } catch (error) {
        setError("Failed to fetch locations.");
      }
      setIsLoading(false);
    };

    fetchLocations();
  }, []);
  return (
    <div className="mt-20 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {isLoading && <LoadingSpinner />}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading && !error && (
        <>
          {locations.length === 0 ? (
            <ErrorMessage errorTitle={"Nema unesenih lokacija."} />
          ) : (
            locations.map((location) => (
              <div key={location._id} className="p-4 border rounded shadow bg-slate-50">
                <h2 className="text-xl font-bold mb-2 ">{location.name}</h2>
                <p className="text-gray-600 mb-4">{location.summary}</p>
                <img src={location.image} alt={location.name} className="w-full h-40 object-cover" />
                <div>
                  <Link to={`/locations/${location._id}`}>
                    <Button>Pročitaj više</Button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default LocationList;
