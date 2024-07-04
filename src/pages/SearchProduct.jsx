import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "./app.css";

function SearchProduct() {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    const params = new URLSearchParams(query?.search);
    const response = await fetch(
      "http://192.168.1.8:8080/search" + query?.search
    );
    const data = await response.json();
    setData(data);
    setSearchTerm(params.get("q"));
  };

  useEffect(() => {
    fetchProducts();
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="mt-2 text-lg">Showing results for "{searchTerm}"</h1>
        <p className="text-xs text-gray-400 mt-2">
          Products found: ({data.length})
        </p>
        <div className="gridd grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-400 p-3 rounded-lg mt-2">
          {data.length !== 0 ? (
            data.map((item, index) => <ProductCard key={index} item={item} />)
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchProduct;
