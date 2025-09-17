import { useContext } from "react";
import { WishListContext } from "./WishListContext";
export const useWishlist = () => useContext(WishListContext);
