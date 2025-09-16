import axios from "axios";
import { useState, useEffect } from "react";
import { useCart } from "../SharedContext/UseCart";
import { useNavigate } from "react-router-dom";

function HomeComponent() {
  const baseUrl = "https://fakestoreapi.com/products";

  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortType, setSortType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate();
  const { addItem } = useCart();

  useEffect(() => {
    axios
      .get(`${baseUrl}/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  useEffect(() => {
    const url =
      selectedCategory === "all"
        ? baseUrl
        : `${baseUrl}/category/${encodeURIComponent(selectedCategory)}`;

    axios
      .get(url)
      .then((res) => {
        setOriginalProducts(res.data);
        setProducts(res.data);
        setSortType("");
        setSearchTerm("");
        setDebouncedTerm("");
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [selectedCategory]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedTerm(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    let filtered = [...originalProducts];

    if (debouncedTerm.trim() !== "") {
      const term = debouncedTerm.toLowerCase();
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(term));
    }

    switch (sortType) {
      case "priceHighLow":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "priceLowHigh":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "titleAZ":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "titleZA":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    setProducts(filtered);
  }, [sortType, debouncedTerm, originalProducts]);

  const handleAddToCart = (product) => {
    addItem(product);
    setShowPopUp(true);
  };

  return (
    <div className="p-5">
      <div className="mb-5 flex flex-col sm:flex-row justify-center gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Sort By…</option>
          <option value="priceHighLow">Price: High → Low</option>
          <option value="priceLowHigh">Price: Low → High</option>
          <option value="titleAZ">Title: A → Z</option>
          <option value="titleZA">Title: Z → A</option>
        </select>

        <input
          type="text"
          placeholder="Search by title…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-64"
        />
      </div>

      <div
        className="
          grid gap-4
          grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        "
      >
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="
              border border-gray-300 p-4 rounded shadow hover:shadow-lg
              transition-shadow duration-300 flex flex-col h-[28rem] cursor-pointer
            "
          >
            <h2 className="font-bold text-md line-clamp-2 min-h-[3rem]">
              {product.title}
            </h2>

            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain mt-2"
            />

            <p className="text-lg text-gray-800 mt-2">{product.price}$</p>
            <p className="text-sm text-gray-600">{product.category}</p>

            <button
              className="
                bg-[#459c98] text-white py-1 px-4 rounded
                hover:bg-[#357a75] transition-colors duration-300 cursor-pointer my-10
              "
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {showPopUp && (
        <div className="fixed inset-0 flex items-center justify-center p-2">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm max-w-sm w-full text-center">
            <h2 className="text-base sm:text-lg font-semibold mb-4">
              Item added to cart!
            </h2>
            <button
              onClick={(e) => {
                setShowPopUp(false);
                e.stopPropagation();
              }}
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#3bc6b4] text-white rounded hover:bg-[#32b0a3] cursor-pointer text-sm sm:text-base"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeComponent;
