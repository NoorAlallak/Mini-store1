import { useWishlist } from "../SharedContext/UseWishlist";
import { useCart } from "../SharedContext/UseCart";
import { useState } from "react";
export default function WishListComponent() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const [showPopUp, setShowPopUp] = useState(false);
  const handleAddToCart = (product) => {
    addItem(product);
    setShowPopUp(true);
  };

  if (wishlist.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500">Your wishlist is empty.</p>
    );

  return (
    <div className="p-5 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 cursor-pointer text-center">
      {wishlist.map((product) => (
        <div key={product.id} className="border p-4 rounded shadow">
          <h2 className="font-bold text-md line-clamp-2 min-h-[3rem]">
            {product.title}
          </h2>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-contain mb-3 my-2"
          />

          <p className="text-lg mt-2 font-semibold">${product.price}</p>
          <div className="text-sm text-gray-600 mb-3 flex justify-center items-center gap-2  mx-auto w-3xs max-w-full">
            <button
              onClick={() => {
                handleAddToCart(product);
              }}
              className="bg-[#459c98] text-white py-1 px-3 rounded hover:bg-[#357a75] transition-colors duration-300 cursor-pointer w-full max-w-xs"
            >
              Add To Cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors duration-300 cursor-pointer w-full max-w-xs"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      {showPopUp && (
        <div className="fixed inset-0 flex items-center justify-center p-2">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm max-w-sm w-full text-center">
            <h2 className="text-base sm:text-lg font-semibold mb-4">
              Item added to cart!
            </h2>
            <button
              onClick={() => setShowPopUp(false)}
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#3bc6b4] text-white rounded hover:bg-[#2aa19f] transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
