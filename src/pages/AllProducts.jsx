import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import AdminProductCard from "../components/AdminProductCard";

function AllProducts() {
  const [allProduct, setAllProduct] = useState([]);
  const [openUploadProduct, setOpenUploadProduct] = useState(false);

  const fetchAllProducts = async () => {
    const response = await fetch("http://192.168.1.8:8080/all-products");

    const dataResponse = await response.json();

    setAllProduct(dataResponse || []);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div>
      <div className="bg-[#222] py-2 rounded-lg px-4 flex justify-between items-center">
        <h2 className="font-semibold text-lg">
          All Products ({allProduct.length})
        </h2>
        <button
          onClick={() => setOpenUploadProduct(true)}
          className="bg-red-500 py-2 px-4 rounded-lg text-white hover:bg-red-600"
        >
          Upload Product
        </button>
      </div>

      <div className="flex items-center flex-wrap gap-5 mt-1 ml-3 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProduct.map((product, index) => {
          return (
            <AdminProductCard
              data={product}
              key={index + "allProduct"}
              fetchData={fetchAllProducts}
            />
          );
        })}
      </div>

      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProducts}
        />
      )}
    </div>
  );
}

export default AllProducts;
