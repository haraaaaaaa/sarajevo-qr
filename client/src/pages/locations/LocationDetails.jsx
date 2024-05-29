import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

const LocationDetails = () => {
  const params = useParams();
  const [location, setLocation] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLocation = async () => {
      setIsLoading(true);

      try {
        const { data: location } = await axios.get(`http://localhost:5000/api/locations/${params.id}`);
        setLocation(location);
      } catch (error) {
        console.error("Fetching location data error:", error);
      }

      setIsLoading(false);
    };

    fetchLocation();
  }, [params.id]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div className="max-w-lg m-auto p-4 mt-20">
          <img src={location.image} alt={location.name} />
          <h1 className="text-xl font-bold mb-2 ">
            <span className="text-orange-500">{location.name}</span>
          </h1>
          <p className="text-gray-600 mb-4">{location.description}</p>
        </div>
      )}
    </>
  );
};

export default LocationDetails;
