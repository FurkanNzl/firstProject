import React, { useState, useEffect } from "react";
import axios from "axios";

const CarIndex = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCars = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://myfakeapi.com/api/cars");
        console.log(response.data.cars)
        setCars(response.data.cars);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getCars();
  }, []);

  useEffect(() => {
    const results = cars.filter((i) =>
      i.car_model.toLowerCase().includes(searchTerm.toLowerCase()) ||i.car  .toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCars(results);
  }, [searchTerm, cars, error]);

  return (
    <div className="flex flex-col items-center w-full h-full p-4">
      <div className="w-full max-w-md mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="search"
        >
          Search by Car:
        </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter Car"
        />
      </div>
      <div className="w-full max-w-md">
        <h1 className="text-xl font-bold mb-2">Cars:</h1>
        <ul className="divide-y divide-yellow-300">
          {filteredCars.map((car) => (
            <li key={car.id} className="py-2">
              {car.car} {car.car_model}
            </li>
          ))}
        </ul>
      </div>
      {loading && <h1>Loading</h1>}
      {error ? <h1>{error}</h1> : null}
    </div>
  );
};

export default CarIndex;
