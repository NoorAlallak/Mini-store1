import { useCart } from "../SharedContext/UseCart";
import { useNavigate } from "react-router-dom";
function NavBarComponent() {
  const navigate = useNavigate();
  const goToCart = () => {
    navigate("/cart");
  };
  const goToHome = () => {
    navigate("/");
  };

  const { count } = useCart();
  return (
    <nav className="bg-[#459c98] p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold mx-4">Mini Store</h1>
      <div className="flex space-x-4 mt-2 mx-4 ">
        <a
          href="#"
          className="hover:underline text-lg text-white relative text-bold"
          onClick={goToHome}
        >
          Home
        </a>
        <a
          href="#"
          className="hover:underline text-lg text-white relative text-bold"
          onClick={goToCart}
        >
          Cart
          <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
            {count}
          </span>
        </a>
      </div>
    </nav>
  );
}
export default NavBarComponent;
