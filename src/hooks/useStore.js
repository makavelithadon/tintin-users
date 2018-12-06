import { useContext } from "react";
import { StoreContext } from "Store";

export default function useStore() {
  return useContext(StoreContext);
}
