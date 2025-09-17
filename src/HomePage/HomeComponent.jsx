import axios from "axios";
import { useState, useEffect } from "react";
import { useCart } from "../SharedContext/UseCart";
import { useWishlist } from "../SharedContext/UseWishlist";
import InfiniteScroll from "react-infinite-scroll-component";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

function HomeComponent() {
  const baseUrl = "https://fakestoreapi.com/products";

  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [itemsPerLoad] = useState(8);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortType, setSortType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);

  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

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
        setAllProducts(res.data);
        setVisibleProducts(res.data.slice(0, itemsPerLoad));
        setHasMore(res.data.length > itemsPerLoad);
        setSortType("");
        setSearchTerm("");
        setDebouncedTerm("");
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [selectedCategory, itemsPerLoad]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedTerm(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    let filtered = [...allProducts];

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

    setVisibleProducts(filtered.slice(0, itemsPerLoad));
    setHasMore(filtered.length > itemsPerLoad);
    setAllProducts(filtered);
  }, [sortType, debouncedTerm]);

  const fetchMore = () => {
    const nextItems = visibleProducts.length + itemsPerLoad;
    const newData = allProducts.slice(0, nextItems);
    setVisibleProducts(newData);
    if (newData.length >= allProducts.length) setHasMore(false);
  };

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
          className="border border-gray-300 rounded px-3 py-2 cursor-pointer"
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
          className="border border-gray-300 rounded px-3 py-2 cursor-pointer"
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

      <InfiniteScroll
        dataLength={visibleProducts.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<p className="text-center my-4">Loading more products…</p>}
        endMessage={
          <p className="text-center my-4 text-gray-500">
            You have seen all products.
          </p>
        }
      >
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-5">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => (window.location.href = `/product/${product.id}`)}
              className="relative border border-gray-300 p-4 rounded shadow hover:shadow-lg
                         transition-shadow duration-300 flex flex-col h-[28rem] cursor-pointer"
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
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
                className="absolute top-70 right-3 p-1 bg-white rounded-full shadow hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
                aria-label="Add To Wishlist"
              >
                {isInWishlist(product.id) ? (
                  <HeartSolid className="h-6 w-6 text-red-500" />
                ) : (
                  <HeartOutline className="h-6 w-6 text-gray-600" />
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                className="bg-[#459c98] text-white py-1 px-4 rounded
                           hover:bg-[#357a75] transition-colors duration-300 cursor-pointer my-10"
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </InfiniteScroll>

      {showPopUp && (
        <div className="fixed inset-0 flex items-center justify-center p-2">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm max-w-sm w-full text-center">
            <h2 className="text-base sm:text-lg font-semibold mb-4">
              Item added to cart!
            </h2>
            <button
              onClick={() => setShowPopUp(false)}
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#3bc6b4] text-white rounded
                         hover:bg-[#32b0a3] cursor-pointer text-sm sm:text-base"
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
