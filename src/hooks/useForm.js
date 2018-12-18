import React, { useState } from "react";

export default function useForm(initialState) {
  const [state, setState] = useState(initialState);
  function handleChange({ target: { name, value } }) {
    setState({ ...state, [name]: value });
  }
  return {
    state,
    handleChange
  };
}
