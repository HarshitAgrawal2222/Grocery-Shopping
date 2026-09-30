import React from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const ProductCard = ({ product }) => {
    const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

    return (
        product && (
            <div
                onClick={() => {
                    navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                    scrollTo(0, 0);
                }}
                className="border border-gray-500/20 rounded-md bg-white w-full max-w-[180px] sm:max-w-[210px] md:max-w-56 p-2 sm:p-3 md:p-4"
            >
                <div className="group cursor-pointer flex items-center justify-center h-[120px] sm:h-[140px] md:h-[160px]">
                    <img
                        className="group-hover:scale-105 transition duration-300 max-h-[110px] sm:max-h-[125px] md:max-h-[145px] max-w-[100px] sm:max-w-[120px] md:max-w-[145px] object-contain"
                        src={product.image[0]}
                        alt={product.name}
                    />
                </div>

                <div className="text-gray-500/60 text-xs sm:text-sm">
                    <p className="truncate">{product.category}</p>

                    <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg truncate w-full mt-1">
                        {product.name}
                    </p>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5)
                            .fill("")
                            .map((_, i) => (
                                <img
                                    key={i}
                                    className="w-3 sm:w-3.5 h-3 sm:h-3.5"
                                    src={
                                        i < 4
                                            ? assets.star_icon
                                            : assets.star_dull_icon
                                    }
                                    alt=""
                                />
                            ))}
                        <p className="text-xs ml-1">(4)</p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2 sm:mt-3">
                        <p className="text-sm sm:text-base md:text-xl font-medium text-primary whitespace-nowrap">
                            {currency}
                            {product.offerPrice}
                            <span className="text-gray-500/60 text-[10px] sm:text-xs md:text-sm line-through ml-1">
                                {currency}
                                {product.price}
                            </span>
                        </p>

                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="text-primary w-full sm:w-auto"
                        >
                            {!cartItems[product._id] ? (
                                <button
                                    className="flex items-center justify-center gap-1 bg-primary-100 border border-primary w-full sm:w-[80px] h-[32px] sm:h-[34px] rounded text-primary-dull font-medium cursor-pointer text-xs sm:text-sm"
                                    onClick={() => addToCart(product._id)}
                                >
                                    <img
                                        className="w-4 h-4"
                                        src={assets.cart_icon}
                                        alt="cart_icon"
                                    />
                                    Add
                                </button>
                            ) : (
                                <div className="flex items-center justify-center gap-1 sm:gap-2 w-full sm:w-20 h-[32px] sm:h-[34px] bg-primary-500/25 rounded select-none">
                                    <button
                                        onClick={() =>
                                            removeFromCart(product._id)
                                        }
                                        className="cursor-pointer text-sm px-2 h-full"
                                    >
                                        -
                                    </button>

                                    <span className="w-5 text-center text-sm">
                                        {cartItems[product._id]}
                                    </span>

                                    <button
                                        onClick={() =>
                                            addToCart(product._id)
                                        }
                                        className="cursor-pointer text-sm px-2 h-full"
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default ProductCard;