import Home from "./HomePage/Home";
import ProductDetails from "./ProductDetailsPage/ProductDetails";
import Cart from "./CartPage/Cart";
import WishList from "./WishListPage/WishList";
import CheckOutComponent from "./CartPage/CheckOutComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/checkout" element={<CheckOutComponent />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}
export default App;
