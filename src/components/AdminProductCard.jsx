import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";

function AdminProductCard({ data, fetchData }) {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg mt-2 h-64">
      <div className="w-32 h-full flex flex-col justify-between">
        <div className="w-28 h-28 flex items-center mx-auto">
          <img
            className="h-full w-full hover:scale-125 cursor-pointer rounded-lg mx-auto object-fill"
            src={data?.productImage[0]}
          />
        </div>
        <h1 className="text-center mt-2 text-ellipsis line-clamp-2 text-black">
          {data.productName}
        </h1>

        <div className="flex justify-center items-center">
          <p className="font-semibold text-center text-black">
            ₹ {data?.price}.00
          </p>

          <div
            onClick={() => setEditProduct(true)}
            className="w-fit ml-auto p-2 bg-orange-100 rounded-full hover:bg-orange-200 cursor-pointer"
          >
            <MdEdit className="text-black hover:scale-125" />
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          fetchData={fetchData}
          productData={data}
          onClose={() => setEditProduct(false)}
        />
      )}
    </div>
  );
}

export default AdminProductCard;
