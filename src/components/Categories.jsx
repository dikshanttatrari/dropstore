import React from "react";
import useWindowSize from "../helper/windowSize";
import { useNavigate } from "react-router-dom";

function Categories() {
  // const [loading, setLoading] = useState(false);
  const categories = [
    {
      id: "0",
      name: "Stationery",
      category: "stationery",
      image:
        "https://res.cloudinary.com/dzwuseok5/image/upload/v1716805822/categoryImages/bkcw0klpelywxqidnjf6.png",
    },
    {
      id: "1",
      name: "Sauces & Spreads",
      category: "sauces & Spreads",
      image:
        "https://res.cloudinary.com/dzwuseok5/image/upload/v1716806084/categoryImages/knrkatwu4tblgqnokrjn.png",
    },
    {
      id: "2",
      name: "Personal Care",
      category: "personalCare",
      image:
        "https://res.cloudinary.com/dzwuseok5/image/upload/v1716806084/categoryImages/ltfekknuygyy4h7vwlwr.png",
    },
    {
      id: "3",
      name: "Baby Care",
      category: "babyCare",
      image:
        "https://res.cloudinary.com/dzwuseok5/image/upload/v1716806083/categoryImages/wwkptedbb7oof5inakxb.png",
    },
    {
      id: "4",
      name: "Cleaning Essentials",
      category: "cleaningEssentials",
      image:
        "https://res.cloudinary.com/dzwuseok5/image/upload/v1716806083/categoryImages/xh0oxmcya3cpiztu9uhu.png",
    },
    {
      id: "5",
      name: "Snacks & Munchies",
      category: "snacks & Munchies",
      image:
        "https://res.cloudinary.com/dzwuseok5/image/upload/v1716806084/categoryImages/j19nxcbmrmriw1wonfir.png",
    },
    {
      id: "6",
      name: "Bakery & Biscuits",
      category: "bakery & Biscuits",
      image:
        "https://res.cloudinary.com/dzwuseok5/image/upload/v1716806083/categoryImages/waaq5dbkmory09lwcudt.png",
    },
    {
      id: "7",
      name: "Dairy, Bread & Eggs",
      category: "dairy, Bread & Eggs",
      image:
        "https://res.cloudinary.com/dzwuseok5/image/upload/v1716806083/categoryImages/j5x513lqsxoerwpm2dym.png",
    },
    {
      id: "8",
      name: "Sweets & Ice cream",
      category: "sweets & Ice cream",
      image:
        "https://res.cloudinary.com/dzwuseok5/image/upload/v1716806084/categoryImages/coao6lkwspniwzj7gxl0.png",
    },
    {
      id: "9",
      name: "Cold Drinks & Juices",
      category: "cold Drinks & Juices",
      image:
        "https://res.cloudinary.com/dzwuseok5/image/upload/v1716806083/categoryImages/ulixke55be4p7lnwxkoa.png",
    },
    {
      id: "10",
      name: "Pet Care",
      category: "petCare",
      image:
        "https://res.cloudinary.com/dzwuseok5/image/upload/v1716806084/categoryImages/cteawgbf377d5k1ljmau.png",
    },
    {
      id: "11",
      name: "Home & Office",
      category: "home & Office",
      image:
        "https://res.cloudinary.com/dzwuseok5/image/upload/v1716806084/categoryImages/ioiwztiwbomtiotmrbe6.png",
    },
    {
      id: "12",
      name: "Breakfast & Instant food",
      category: "breakfast & Instant food",
      image:
        "https://res.cloudinary.com/dzwuseok5/image/upload/v1716806082/categoryImages/mkn5dkpgdfirfeupvesg.png",
    },
    {
      id: "13",
      name: "Tea, Coffee & More",
      category: "tea, Coffee & More",
      image:
        "https://res.cloudinary.com/dzwuseok5/image/upload/v1716806084/categoryImages/qvfuu5if4phzixeip5tf.png",
    },
    {
      id: "14",
      name: "Atta, Rice & Dal",
      category: "atta, Rice & Dal",
      image:
        "https://res.cloudinary.com/dzwuseok5/image/upload/v1716806082/categoryImages/ixjkd0kbddyswurfc16u.png",
    },
    {
      id: "15",
      name: "Masala, Oil & More",
      category: "masala, Oil & More",
      image:
        "https://res.cloudinary.com/dzwuseok5/image/upload/v1716806084/categoryImages/drilwcr77ha5jm40zabc.png",
    },
  ];

  const size = useWindowSize();
  const navigate = useNavigate();

  const categoryItemCols = size.width <= 480 ? 4 : 8;

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  return (
    <div className="flex flex-col items-center justify-center mb-8 cursor-pointer">
      <div className="mt-2 mb-2 bg-[#e25876] p-2 rounded-lg">
        <p className="text-2xl text-white font-bold">Shop by category</p>
      </div>
      <div
        className="grid gap-2 lg:gap-1 categories lg:ml-4 lg:mr-4 "
        style={{
          gridTemplateColumns: `repeat(${categoryItemCols}, minmax(0, 1fr))`,
        }}
      >
        {categories.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col items-center pl-1 pr-1 pt-1 mt-1"
            onClick={() => handleCategoryClick(item?.category)}
          >
            <div className="bg-slate-400 rounded-xl">
              <img
                src={item.image}
                alt={item.name}
                key={index}
                className="w-full object-cover h-20 md:h-24 md:w-28 p-3 hover:scale-125 "
              />
            </div>
            <p className="mt-2 text-center text-xs">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
