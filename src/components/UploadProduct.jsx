import axios from "axios";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

function UploadProduct({ onClose, fetchData }) {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
  });

  const productCategory = [
    {
      id: "1",
      label: "Stationery",
      value: "stationery",
    },
    {
      id: "2",
      label: "Sauces & Spreads",
      value: "sauces & Spreads",
    },
    {
      id: "3",
      label: "Personal Care",
      value: "personalCare",
    },
    {
      id: "4",
      label: "Baby Care",
      value: "babyCare",
    },
    {
      id: "5",
      label: "Cleaning Essentials",
      value: "cleaningEssentials",
    },
    {
      id: "6",
      label: "Snacks & Munchies",
      value: "snacks & Munchies",
    },
    {
      id: "7",
      label: "Bakery & Biscuits",
      value: "bakery & Biscuits",
    },
    {
      id: "8",
      label: "Dairy, Bread & Eggs",
      value: "dairy, Bread & Eggs",
    },
    {
      id: "9",
      label: "Sweets & Ice cream",
      value: "sweets & Ice cream",
    },
    {
      id: "10",
      label: "Cold Drinks & Juices",
      value: "cold Drinks & Juices",
    },
    {
      id: "11",
      label: "Pet Care",
      value: "petCare",
    },
    {
      id: "12",
      label: "Home & Office",
      value: "home & Office",
    },
    {
      id: "13",
      label: "Breakfast & Instant food",
      value: "breakfast & Instant Food",
    },
    {
      id: "14",
      label: "Tea, Coffee & More",
      value: "tea, Coffee & More",
    },
    {
      id: "15",
      label: "Atta, Rice & Dal",
      value: "atta, Rice & Dal",
    },
    {
      id: "16",
      label: "Masala, Oil & More",
      value: "masala, Oil & More",
    },
    {
      id: "17",
      label: "Body & Bath",
      value: "body & Bath",
    },
    {
      id: "18",
      label: "Hair Care",
      value: "hairCare",
    },
    {
      id: "19",
      label: "Skin & Face",
      value: "skin & Face",
    },
    {
      id: "20",
      label: "Oral Care",
      value: "oralCare",
    },
    {
      id: "21",
      label: "Feminine Hygiene",
      value: "feminineHygiene",
    },
    {
      id: "22",
      label: "Pharma & Wellness",
      value: "pharma & Wellness",
    },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const url = `https://api.cloudinary.com/v1_1/dzwuseok5/image/upload`;
    const uploadImage = async (image) => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "dropstore_products");

      const dataResponse = await fetch(url, {
        method: "post",
        body: formData,
      });

      return dataResponse.json();
    };
    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://192.168.1.13:8080/upload-product",
        data
      );

      if (response.data.ok) {
        toast.success(response.data.message);
        onClose();
        fetchData();
      } else {
        toast.success(response.data.message);
        onClose();
        fetchData();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="fixed bg-slate-300 bg-opacity-35 w-full h-full bottom-0 top-0 left-0 right-0 flex justify-center items-center ">
      <div className="bg-[#333] p-4 rounded-lg w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">Upload Product</h2>
          <div className="w-fit ml-auto">
            <CgClose
              className="text-2xl hover:text-red-500 cursor-pointer"
              onClick={onClose}
            />
          </div>
        </div>

        <form
          className="grid p-4 gap-1 h-full overflow-y-scroll"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name: </label>
          <input
            className="p-2 bg-orange-100 rounded-lg mb-2 text-black outline-none"
            type="text"
            id="productName"
            name="productName"
            placeholder="Enter Product name"
            value={data.productName}
            required
            onChange={handleOnChange}
          />

          <label htmlFor="brandName">Brand Name: </label>
          <input
            className="p-2 bg-orange-100 rounded-lg mb-2 text-black outline-none"
            type="text"
            id="brandName"
            name="brandName"
            placeholder="Enter Brand name"
            value={data.brandName}
            required
            onChange={handleOnChange}
          />

          <label htmlFor="category">Category: </label>
          <select
            required
            value={data.category}
            name="category"
            onChange={handleOnChange}
            className="p-2 bg-orange-100 rounded-lg text-black outline-none"
          >
            <option value={""}>Select Category</option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="description">Description: </label>
          <input
            className="p-2 bg-orange-100 rounded-lg mb-2 text-black outline-none"
            type="text"
            name="description"
            id="description"
            placeholder="Enter description"
            value={data.description}
            onChange={handleOnChange}
            required
          />

          <label htmlFor="price">Price: </label>
          <input
            className="p-2 bg-orange-100 rounded-lg mb-2 text-black outline-none"
            type="number"
            id="price"
            name="price"
            placeholder="Enter price"
            value={data.price}
            onChange={handleOnChange}
          />

          <label htmlFor="productImage">Image: </label>
          <label htmlFor="UploadImageInput">
            <div className="cursor-pointer p-2 bg-orange-100 rounded-lg w-full flex justify-center items-center">
              <div className="text-black flex justify-center items-center">
                <span className="text-2xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-md ml-1">Upload Product Image</p>
                <input
                  type="file"
                  id="UploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>

          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((el, index) => {
                  return (
                    <div className="relative group">
                      <img
                        src={el}
                        alt={el}
                        width={100}
                        height={100}
                        className="mt-2 bg-orange-100 rounded-lg cursor-pointer mb-2"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />

                      <div
                        className="cursor-pointer absolute top-1 right-0 p-1 text-white bg-red-500 rounded-full hidden group-hover:block"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDelete className="text-xl" />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-300">* Upload product images</p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="bg-red-400 hover:bg-red-500 px-2 py-3 rounded-lg text-white mb-8"
          >
            Upload Product
          </button>
        </form>
      </div>

      {/* {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imageUrl={fullScreenImage}
        />
      )} */}
    </div>
  );
}

export default UploadProduct;
