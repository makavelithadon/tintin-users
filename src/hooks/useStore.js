import { useContext } from "react";
import { StoreContext } from "state/store";

export default function useStore() {
  return useContext(StoreContext);
}
