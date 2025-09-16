import { useCart } from "../SharedContext/UseCart";
import { useState } from "react";
function CartComponent() {
  const { cartItems, removeItem, updateQty, clearCart, total } = useCart();
  const [showPopUp, setShowPopUp] = useState(false);
  const [isClearAll, setIsClearAll] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const handleRemoveItem = (id) => {
    setItemToRemove(id);
    setIsClearAll(false);
    setShowPopUp(true);
  };
  const handleClearCart = () => {
    setItemToRemove(null);
    setIsClearAll(true);
    setShowPopUp(true);
  };
  if (cartItems.length === 0) {
    return (
      <div className="p-5 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600">Add some products to your cart.</p>
      </div>
    );
  }

  return (
    <div className="p-5 space-y-4 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold my-8 text-center">Cart Page</h1>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="border p-4 rounded my-4 shadow hover:shadow-lg transition-shadow duration-300 "
        >
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-contain mt-2"
          />
          <p className="text-gray-600 font-semibold">Price: {item.price}$</p>
          <div className="mt-2">
            <label className="mr-2">Quantity:</label>
            <input
              type="number"
              value={item.qty}
              min="1"
              onChange={(e) => updateQty(item.id, parseInt(e.target.value, 10))}
              className="border p-1 rounded w-12 text-center"
            />
            <div className="text-center mt-2">
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition-colors duration-300 cursor-pointer  mt-2 w-3xs max-w-full  "
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="border-t pt-4 flex flex-row justify-between items-center">
        <p className="text-xl font-semibold mt-3">
          <strong>Total: </strong> {total}$
        </p>
        <button
          onClick={handleClearCart}
          className="mt-4 bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition-colors duration-300 cursor-pointer self-start"
        >
          Clear Cart
        </button>
        {showPopUp && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 p-2">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm max-w-sm w-full text-center">
              <h2 className="text-base sm:text-lg font-semibold mb-4">
                {isClearAll
                  ? "Are you sure you want to clear the entire cart?"
                  : "Are you sure you want to remove this item?"}
              </h2>
              <button
                onClick={() => {
                  if (isClearAll) {
                    clearCart();
                  } else {
                    removeItem(itemToRemove);
                  }
                  setShowPopUp(false);
                }}
                className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#459c98] text-white rounded hover:bg-[#32b0a3] cursor-pointer text-sm sm:text-base"
              >
                OK
              </button>
              <button
                onClick={() => setShowPopUp(false)}
                className="ml-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default CartComponent;
