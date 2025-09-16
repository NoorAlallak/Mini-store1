import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../SharedContext/UseCart";
import { useNavigate } from "react-router-dom";
function ProductDetailsComponent() {
  const [product, setProduct] = useState([]);
  const id = useParams().id;
  const { addItem, removeItem, cartItems } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);
  if (!product) return <div>Loading...</div>;
  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow my-15 transition-transform transform hover:shadow-lg text-center">
      <a
        onClick={() => navigate(-1)}
        className="text-black mb-4 inline-block cursor-pointer hover:underline text-lg text-left font-semibold"
      >
        &larr; Back
      </a>
      <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-contain mb-4"
      />
      <p className="text-lg text-gray-800 mb-2">{product.price}$</p>
      <p className="text-sm text-gray-600 mb-4">{product.category}</p>
      <p className="text-gray-700 mb-4">{product.description}</p>
      {cartItems.some((item) => item.id === product.id) ? (
        <button
          onClick={() => removeItem(product.id)}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300 cursor-pointer"
        >
          Remove from Cart
        </button>
      ) : (
        <button
          onClick={() => addItem(product)}
          className="bg-[#459c98] text-white py-2 px-4 rounded hover:bg-[#357a75] transition-colors duration-300 cursor-pointer"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
export default ProductDetailsComponent;
