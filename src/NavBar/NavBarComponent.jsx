import { useCart } from "../SharedContext/UseCart";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../SharedContext/UseWishlist";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
function NavBarComponent() {
  const navigate = useNavigate();
  const goToCart = () => {
    navigate("/cart");
  };
  const goToHome = () => {
    navigate("/");
  };
  const goToWishList = () => {
    navigate("/wishlist");
  };
  const { i18n } = useTranslation();
  const location = useLocation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const showLanguageSwitcher = location.pathname === "/checkout";

  const { wishlist } = useWishlist();
  const { count } = useCart();
  return (
    <nav className="bg-[#459c98] p-4 text-white flex justify-between items-center w-full w-max-lg">
      <h1 className="text-xl font-bold mx-4">Mini Store</h1>
      <div className="flex space-x-4 mt-2 mx-4 ">
        {showLanguageSwitcher && (
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded cursor-pointer ${
                i18n.language === "en" ? "bg-gray-500 rounded" : ""
              }`}
              onClick={() => changeLanguage("en")}
            >
              English
            </button>
            <button
              className={`px-3 py-1 rounded cursor-pointer ${
                i18n.language === "ar" ? "bg-gray-500 rounded" : ""
              }`}
              onClick={() => changeLanguage("ar")}
            >
              العربية
            </button>
          </div>
        )}
        <a
          href=""
          className="hover:underline text-lg text-white relative text-bold"
          onClick={goToHome}
        >
          {i18n.t("nav.home")}
        </a>
        <a
          href=""
          className="hover:underline text-lg text-white relative text-bold"
          onClick={goToCart}
        >
          cart
          <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
            {count}
          </span>
        </a>
        <a
          href=""
          className="relative"
          onClick={goToWishList}
          aria-label="Wishlist"
        >
          <HeartOutline className="h-8 w-8 text-gray-700" />
          {wishlist.length > 0 && (
            <span
              className="absolute -top-1 -right-1 bg-red-500 text-white
                           rounded-full text-xs px-2 py-0.5"
            >
              {wishlist.length}
            </span>
          )}
        </a>
      </div>
    </nav>
  );
}
export default NavBarComponent;
