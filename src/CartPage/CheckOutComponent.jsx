import { useState } from "react";
import { useCart } from "../SharedContext/UseCart";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
function CheckOutComponent() {
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showPopUpMsg, setShowPopUpMsg] = useState("");

  const availableCoupons = {
    SAVE10: 10,
    SAVE20: 20,
  };

  if (cartItems.length === 0) return null;

  const handleApplyCoupon = () => {
    const upper = couponCode.toUpperCase();
    if (availableCoupons[upper]) {
      setDiscount(availableCoupons[upper]);
      setShowPopUp(true);
      setShowPopUpMsg(
        `${t("checkout.couponApplied")} ${availableCoupons[upper]}% off`
      );
    } else {
      setDiscount(0);
      setShowPopUp(true);
      setShowPopUpMsg(t("checkout.invalidCoupon"));
      setCouponCode("");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.address.trim()) errs.address = "Address is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSuccess(true);

    setTimeout(() => {
      clearCart();
      navigate("/");
    }, 2000);
  };

  const discountedTotal = total * (1 - discount / 100);

  return (
    <>
      <NavBar />
      <div className="max-w-lg mx-auto p-5 border rounded shadow mb-6 text-center my-15">
        <div className="flex gap-10 mb-6 items-center">
          <span
            className="text-lg font-semibold cursor-pointer hover:underline text-left"
            onClick={() => window.history.back()}
          >
            {t("checkout.back")}
          </span>
          <div className="text-center flex-grow mr-20 ">
            <h2 className="text-2xl font-bold mb-4 text-center flex-1  ">
              {t("checkout.title")}
            </h2>
          </div>
        </div>

        <ul className="mb-4">
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between my-2">
              <span>{item.title}</span>
              <span className="font-semibold">${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>

        {success ? (
          <p className="text-green-600 font-semibold">
            ✅ Payment successful! Redirecting to home…
          </p>
        ) : (
          <form onSubmit={handleCheckout} className="flex flex-col gap-3">
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="border px-3 py-2 rounded flex-1"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="bg-[#459c98] text-white px-4 py-2 rounded hover:bg-[#357a75] transition-colors duration-300 cursor-pointer"
              >
                {t("checkout.apply")}
              </button>
            </div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            <textarea
              name="address"
              placeholder="Shipping Address"
              value={form.address}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}

            <p className="mb-4 font-bold text-2xl">
              {t("checkout.total")}: ${total.toFixed(2)}
              {discount > 0 && (
                <span className="ml-2 text-green-600">
                  → ${discountedTotal.toFixed(2)} ({discount}% off)
                </span>
              )}
            </p>

            <button
              type="submit"
              disabled={showPopUp}
              className={`bg-[#459c98] text-white py-2 px-4 rounded mt-2 transition-colors duration-300 cursor-pointer
    ${showPopUp ? "opacity-50 cursor-not-allowed" : "hover:bg-[#357a75]"}`}
            >
              {t("checkout.payNow")}
            </button>
          </form>
        )}
        {showPopUp && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 p-2">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm max-w-sm w-full text-center">
              <h2 className="text-base sm:text-lg font-semibold mb-4">
                {showPopUpMsg}
              </h2>
              <button
                onClick={() => setShowPopUp(false)}
                className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#3bc6b4] text-white rounded hover:bg-[#32b0a3] cursor-pointer text-sm sm:text-base"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CheckOutComponent;
