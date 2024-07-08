import React, { useState, useEffect } from "react";
import axios from "axios";
const FakestoreSearch = () => {
  const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const results = products.filter((i) =>
      i.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products, error]);

  return (
    <div className="flex flex-col items-center w-full h-full p-4">
      <div className="w-full max-w-md mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="search"
        >
          Search by Title:
        </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter product title"
        />
      </div>
      <div className="w-full max-w-md">
        <h1 className="text-xl font-bold mb-2">Products:</h1>
        <ul className="divide-y divide-gray-300">
          {filteredProducts.map((product) => (
            <li key={product.id} className="py-2">
              {product.title}
            </li>
          ))}
        </ul>
      </div>
      {loading && <h1>Loading</h1>}
      {error ? <h1>{error}</h1> : null}
    </div>
  );
};

export default FakestoreSearch;
