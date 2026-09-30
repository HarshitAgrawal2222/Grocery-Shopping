import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItems,
    navigate,
    getCartAmount,
    axios,
    user,
    setCartItems,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setselectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let tempArray = [];

    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);

      if (product) {
        tempArray.push({
          ...product,
          quantity: cartItems[key],
        });
      }
    }

    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get", {
        withCredentials: true,
      });

      if (data.success) {
        setAddresses(data.addresses || []);

        if (data.addresses && data.addresses.length > 0) {
          setselectedAddress(data.addresses[0]);
        } else {
          setselectedAddress(null);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to load addresses"
      );
    }
  };

  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select an address");
      }

      if (cartArray.length === 0) {
        return toast.error("Cart is empty");
      }

      const orderData = {
        items: cartArray.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        address: selectedAddress,
      };

      if (paymentOption === "COD") {
        const { data } = await axios.post(
          "/api/order/cod",
          orderData,
          {
            withCredentials: true,
          }
        );

        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          "/api/order/stripe",
          orderData,
          {
            withCredentials: true,
          }
        );

        if (data.success) {
          window.location.replace(data.url);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to place order"
      );
    }
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user]);

  return products.length > 0 && cartItems ? (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 mt-8 md:mt-16 pb-10">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

        <div className="flex-1 min-w-0">

          <h1 className="text-2xl sm:text-3xl font-medium mb-5">
            Shopping Cart{" "}
            <span className="text-sm text-primary">
              {getCartCount()} Items
            </span>
          </h1>

          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-gray-500 pb-3 border-b">
            <p>Product Details</p>
            <p className="text-center">Subtotal</p>
            <p className="text-center">Action</p>
          </div>

          <div className="space-y-4 mt-3">

            {cartArray.map((product) => (
              <div
                key={product._id}
                className="border border-gray-200 rounded-lg p-3 sm:p-4"
              >

                <div className="md:grid md:grid-cols-[2fr_1fr_1fr] md:items-center">

                  <div
                    onClick={() => {
                      navigate(
                        `/products/${product.category.toLowerCase()}/${product._id}`
                      );
                      scrollTo(0, 0);
                    }}
                    className="flex items-center gap-3 sm:gap-4 cursor-pointer min-w-0"
                  >

                    <img
                      src={product.image[0]}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain border rounded-md shrink-0"
                      alt={product.name}
                    />

                    <div className="min-w-0">

                      <p className="font-semibold text-sm sm:text-base truncate">
                        {product.name}
                      </p>

                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Weight: {product.weight || "N/A"}
                      </p>

                      <select
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                          updateCartItems(
                            product._id,
                            Number(e.target.value)
                          )
                        }
                        value={cartItems[product._id]}
                        className="border border-gray-300 rounded px-2 py-1 mt-2 text-sm outline-none"
                      >
                        {[...Array(9)].map((_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>

                    </div>
                  </div>

                  <p className="hidden md:block text-center font-medium">
                    {currency}
                    {product.offerPrice * product.quantity}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeFromCart(product._id)}
                    className="hidden md:block cursor-pointer"
                  >
                    <img
                      src={assets.remove_icon}
                      className="w-5 mx-auto"
                      alt="remove"
                    />
                  </button>

                </div>

                <div className="flex md:hidden items-center justify-between mt-4 pt-3 border-t">

                  <p className="font-semibold text-primary">
                    {currency}
                    {product.offerPrice * product.quantity}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeFromCart(product._id)}
                    className="flex items-center gap-2 text-red-500 text-sm cursor-pointer"
                  >
                    <img
                      src={assets.remove_icon}
                      className="w-4"
                      alt="remove"
                    />
                    Remove
                  </button>

                </div>

              </div>
            ))}

          </div>

          <button
            type="button"
            onClick={() => navigate("/product")}
            className="mt-6 text-primary hover:underline cursor-pointer text-sm sm:text-base"
          >
            ← Continue Shopping
          </button>

        </div>

        <div className="w-full lg:max-w-[360px] lg:min-w-[320px] p-4 sm:p-5 border border-gray-200 rounded-lg h-fit">

          <h2 className="text-xl font-medium">
            Order Summary
          </h2>

          <div className="mt-5">

            <p className="text-sm font-medium">
              Delivery Address
            </p>

            <div className="relative mt-2">

              <div className="bg-gray-50 rounded-md p-3 text-sm text-gray-500 leading-6">

                {selectedAddress ? (
                  <>
                    {selectedAddress.street},{" "}
                    {selectedAddress.city}

                    {selectedAddress.state &&
                      `, ${selectedAddress.state}`}

                    , {selectedAddress.zipcode},{" "}
                    {selectedAddress.country}

                    <br />

                    Ph: {selectedAddress.phone}
                  </>
                ) : (
                  "No address found"
                )}

              </div>

              <button
                type="button"
                onClick={() => setShowAddress(!showAddress)}
                className="text-primary text-sm mt-2 cursor-pointer"
              >
                Change
              </button>

              {showAddress && (
                <div className="absolute left-0 right-0 bg-white border border-gray-200 shadow-md rounded-md mt-2 z-20 max-h-48 overflow-y-auto">

                  {addresses.length > 0 ? (
                    addresses.map((addr, index) => (
                      <button
                        type="button"
                        key={addr._id || index}
                        onClick={() => {
                          setselectedAddress(addr);
                          setShowAddress(false);
                        }}
                        className="block w-full text-left p-3 text-sm hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                      >
                        {addr.street}, {addr.city}
                      </button>
                    ))
                  ) : (
                    <p className="p-3 text-sm text-gray-500">
                      No saved addresses
                    </p>
                  )}

                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setShowAddress(false);
                  navigate("/add-address");
                }}
                className="w-full text-primary text-sm text-center mt-3 cursor-pointer hover:underline"
              >
                + Add New Address
              </button>

            </div>

            <p className="mt-6 text-sm font-medium">
              Payment Method
            </p>

            <select
              onChange={(e) => setPaymentOption(e.target.value)}
              value={paymentOption}
              className="w-full border border-gray-300 rounded-md p-2.5 mt-2 text-sm outline-none"
            >
              <option value="COD">
                Cash On Delivery
              </option>

              <option value="Online">
                Online Payment
              </option>
            </select>

          </div>

          <div className="mt-5 pt-4 border-t space-y-3 text-gray-600 text-sm">

            <p className="flex justify-between">
              <span>Price</span>

              <span>
                {currency}
                {getCartAmount()}
              </span>
            </p>

            <p className="flex justify-between">
              <span>Tax</span>

              <span>
                {currency}
                {(getCartAmount() * 0.02).toFixed(2)}
              </span>
            </p>

            <p className="flex justify-between font-semibold text-base text-gray-800 pt-2 border-t">
              <span>Total</span>

              <span>
                {currency}
                {(getCartAmount() * 1.02).toFixed(2)}
              </span>
            </p>

          </div>

          <button
            type="button"
            onClick={placeOrder}
            className="w-full mt-5 bg-primary hover:bg-primary-dull text-white py-2.5 rounded-md transition cursor-pointer"
          >
            Place Order
          </button>

        </div>

      </div>
    </div>
  ) : null;
};

export default Cart;