import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useContext,
} from "react";
import { useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useScrollToTop from "../helper/scrollToTop";
import { toast } from "react-toastify";
import { UserContext } from "../../userContext";
import loadingAnimation from "../assets/loading5.json";
import Lottie from "react-lottie";
import buttonLoadingAnimation from "../assets/loading3.json";

const ProductDetails = () => {
  const { fetchUserCartItems } = useContext(UserContext);
  useScrollToTop();
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImage, setZoomImage] = useState(false);
  const [added, setAdded] = useState(false);
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
  });

  const [imageZoom, setImageZoom] = useState({
    x: 0,
    y: 0,
  });

  const sliderRef = useRef(null);
  const params = useParams();

  const fetchProductDetails = async () => {
    try {
      const response = await fetch("http://192.168.1.13:8080/product-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: params?.productId }),
      });
      setLoading(false);

      const dataResponse = await response.json();
      setData(dataResponse);
      setActiveImage(dataResponse?.productImage[0]);
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const alreadyAdded = cartItems.includes(dataResponse?._id);
      setAdded(alreadyAdded);
    } catch (err) {
      console.log("Error Fetching Product Details", err);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params?.productId, params]);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -100, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 100, behavior: "smooth" });
  };

  const handleImageChange = (image) => {
    setActiveImage(image);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setImageZoom({ x, y });
  }, []);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const addToCart = async (e, id) => {
    e?.stopPropagation();
    e?.preventDefault();
    setButtonLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("You must be logged in to add products to the cart.");
        return;
      }

      const response = await fetch("http://192.168.1.13:8080/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: id, quantity: 1 }),
      });

      const dataResponse = await response.json();

      if (response.ok) {
        fetchUserCartItems();
        setAdded(true);
        // toast.success(data?.message);

        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartItems.push(id);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      } else {
        toast.error(data?.message || "Failed to add to cart.");
      }
    } catch (err) {
      toast.error(err?.message || "Error while adding to cart.");
    } finally {
      setButtonLoading(false);
    }
  };

  const handleRemoveFromCart = async (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    setButtonLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("You must be logged in to remove products from the cart.");
        return;
      }

      const response = await fetch(
        "http://192.168.1.13:8080/remove-from-cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: data?._id }),
        }
      );

      const dataRes = await response.json();

      if (response.ok) {
        setAdded(false);
        fetchUserCartItems();
        // toast.success(data?.message);

        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const updatedCartItems = cartItems.filter((id) => id !== data?._id);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      }
    } catch (err) {
      toast.error(err?.message || "Error while removing from cart.");
    } finally {
      setButtonLoading(false);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: buttonLoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      progressiveLoad: true,
    },
  };

  return (
    <div>
      {loading ? (
        <div>
          <Lottie
            style={{
              height: 200,
              width: 200,
              alignSelf: "center",
              marginTop: 40,
              justifyContent: "center",
            }}
            options={{
              loop: true,
              autoplay: true,
              animationData: loadingAnimation,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
                progressiveLoad: true,
              },
            }}
          />
        </div>
      ) : (
        <div className="container mx-auto p-4 flex md:flex-row flex-col justify-between gap-8 mt-4 md:mt-10 mb-10">
          <div className="flex flex-col">
            <div className="w-full max-w-md mb-5 relative bg-white rounded-lg">
              <img
                src={activeImage}
                alt="Main Product"
                className="w-full h-full object-cover rounded-lg cursor-crosshair"
                onMouseMove={handleZoomImage}
                onMouseLeave={handleLeaveImageZoom}
              />
              {zoomImage && (
                <div className="absolute hidden lg:block rounded-lg -right-[530px] top-0 min-w-[500px] min-h-[500px] bg-white p-1 overflow-hidden">
                  <div
                    className="w-full h-full min-h-[500px] min-w-[500px] mix-blend-multiply scale-150 transition-all duration-200 ease-in-out"
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: `${imageZoom.x * 100}% ${
                        imageZoom.y * 100
                      }%`,
                      backgroundSize: "200%",
                    }}
                  ></div>
                </div>
              )}
            </div>
            <div className="relative w-full max-w-md">
              <button
                className="absolute -left-6 top-12 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hidden md:block"
                onClick={scrollLeft}
              >
                <FaChevronLeft className="text-black" />
              </button>
              <div
                ref={sliderRef}
                className="mt-5 flex flex-row gap-5 overflow-x-scroll scrollbar-none"
                style={{ scrollSnapType: "x mandatory" }}
              >
                {data.productImage.map((item, index) => {
                  return (
                    <div
                      className="bg-white rounded-lg w-16 h-16 flex-shrink-0"
                      key={index}
                      style={{ scrollSnapAlign: "center" }}
                    >
                      <img
                        src={item}
                        onMouseEnter={() => handleImageChange(item)}
                        onClick={() => handleImageChange(item)}
                        className="w-full h-full object-cover rounded-lg cursor-pointer hover:border-4 hover:border-[#7CB342]"
                        alt={`Product thumbnail ${index + 1}`}
                      />
                    </div>
                  );
                })}
              </div>
              <button
                className="absolute -right-6 top-12 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hidden md:block"
                onClick={scrollRight}
              >
                <FaChevronRight className="text-black" />
              </button>
            </div>
          </div>
          <div className="flex flex-col md:mt-14 md:ml-28">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">
                {data.productName}
              </h1>
            </div>

            <div className="flex flex-row justify-between items-center mt-2 md:mt-6">
              <div className="mt-2">
                <p className="text-md font-bold">₹ {data.price}.00</p>
                <p className="text-xs text-gray-400">
                  (Inclusive of all taxes)
                </p>
              </div>
              <div className="md:mr-14">
                {buttonLoading ? (
                  <div className="flex justify-center items-center h-12 w-24">
                    <Lottie options={defaultOptions} height={100} width={100} />
                  </div>
                ) : added ? (
                  <button
                    onClick={(e) => handleRemoveFromCart(e)}
                    className="bg-[#e23856] rounded-lg cursor-pointer"
                  >
                    <p className="p-2 pl-5 pr-5 text-md font-semibold">
                      Remove
                    </p>
                  </button>
                ) : (
                  <button
                    onClick={(e) => addToCart(e, data?._id)}
                    className="bg-[#1E88E5] rounded-lg cursor-pointer"
                  >
                    <p className="p-2 pl-5 pr-5 text-md font-semibold">
                      Add to Cart
                    </p>
                  </button>
                )}
              </div>
            </div>

            <div className="md:mt-4 mt-4">
              <h1 className="text-xl mt-4">Product Details:</h1>
              <div className="mt-4 md:mt-4">
                <p className="text-gray-400 text-md">Brand:</p>
                <p className="text-sm text-[#e25876] font-semibold">
                  {data.brandName}
                </p>
              </div>
              <div className="mt-4 md:mt-4">
                <p className="text-gray-400 text-md">Category:</p>
                <p className="text-sm capitalize">{data.category}</p>
              </div>
              <div className="mt-4 md:mt-4">
                <p className="text-gray-400 text-md">Seller:</p>
                <p className="text-sm">Krishna General Store</p>
              </div>
              <div className="mt-4 md:mt-4">
                <p className="text-gray-400 text-md">Expiry:</p>
                <p className="text-sm">
                  Please refer to the product packaging for the expiry date.
                </p>
              </div>
              <div className="mt-4 md:mt-4">
                <p className="text-gray-400 text-md">Product Description:</p>
                <p className="text-sm">{data.description}</p>
              </div>
              <div className="mt-4 md:mt-4">
                <p className="text-gray-400 text-md">Disclaimer:</p>
                <p className="text-sm">
                  We understand the importance of providing accurate
                  information, and we make every effort to ensure its accuracy.
                  However, please be aware that the actual product packaging and
                  materials may sometimes include additional or different
                  information. We advise you not to solely rely on the
                  information presented, but to also consider other sources for
                  a comprehensive understanding.
                </p>
              </div>
              <div className="mt-4 md:mt-4">
                <p className="text-gray-400 text-md">Return Policy:</p>
                <p className="text-sm">
                  We understand that you may have received a damaged, defective,
                  expired, or incorrect item. You can request a replacement
                  within 24 hours of delivery. If the item is incorrect, you may
                  raise a replacement or return request as long as it is sealed,
                  unopened, unused, and in its original condition.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
