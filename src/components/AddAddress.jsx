import React from "react";
import { CgClose } from "react-icons/cg";

function AddAddress({ onClose, onSubmit, addressData, setAddressData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="fixed bg-slate-300 bg-opacity-35 w-full h-full bottom-0 top-0 left-0 right-0 flex justify-center items-center z-40">
      <div className="bg-[#333] p-4 rounded-lg w-full md:max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">Add Address</h2>
          <div className="w-fit ml-auto">
            <CgClose
              className="text-2xl hover:text-red-500 cursor-pointer"
              onClick={onClose}
            />
          </div>
        </div>

        <form
          className="grid p-4 gap-1 h-full overflow-y-scroll"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <label htmlFor="name">Name: </label>
          <input
            className="p-2 bg-orange-100 rounded-lg mb-2 text-black w-[100%] outline-none"
            type="text"
            id="name"
            name="name"
            placeholder="Enter name"
            value={addressData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="street">Address: </label>
          <input
            className="p-2 bg-orange-100 rounded-lg mb-2 text-black w-[100%] outline-none"
            type="text"
            id="street"
            name="street"
            placeholder="Enter your address.."
            value={addressData.street}
            onChange={handleChange}
            required
          />

          <label htmlFor="landmark">Landmark: </label>
          <input
            className="p-2 bg-orange-100 rounded-lg mb-2 w-[100%] text-black outline-none"
            type="text"
            id="landmark"
            name="landmark"
            placeholder="Enter landmark"
            value={addressData.landmark}
            onChange={handleChange}
            required
          />

          <label htmlFor="houseNo">House No: </label>
          <input
            className="p-2 bg-orange-100 rounded-lg mb-2 w-[100%] text-black outline-none"
            type="number"
            id="houseNo"
            name="houseNo"
            placeholder="Enter house number"
            value={addressData.houseNo}
            onChange={handleChange}
            required
          />

          <label htmlFor="postalCode">Postal Code: </label>
          <input
            className="p-2 bg-orange-100 rounded-lg mb-2 w-[100%] text-black outline-none"
            type="number"
            id="postalCode"
            name="postalCode"
            placeholder="Enter postal code"
            value={addressData.postalCode}
            onChange={handleChange}
            required
          />

          <label htmlFor="mobileNo">Mobile Number: </label>
          <input
            className="p-2 bg-orange-100 rounded-lg mb-2 w-[100%] text-black outline-none"
            type="number"
            id="mobileNo"
            name="mobileNo"
            placeholder="Enter mobile number"
            value={addressData.mobileNo}
            onChange={handleChange}
            required
          />

          <button
            className="bg-orange-600 p-2 rounded-lg mt-4 hover:bg-orange-700 mb-4"
            type="submit"
          >
            Add Address
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAddress;
