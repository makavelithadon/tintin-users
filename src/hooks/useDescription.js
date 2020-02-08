import { useState, useEffect } from "react";
import api from "api";
import { parseText } from "api/utils";

export default function useDescription(raw) {
  const [{ description, error }, setDescription] = useState({
    description: "",
    error: null
  });
  async function getDescription() {
    let state = {};
    try {
      const response = await api.get(raw);
      console.log("response", response);
      const description = await parseText(response);
      state = { ...state, description, error: null };
    } catch (error) {
      console.error(`Error <${new Date()}>`, error);
      state = { ...state, description: null, error };
    } finally {
      setDescription(state);
    }
  }

  useEffect(() => {
    getDescription();
  }, [raw]);

  return { description, error };
}
