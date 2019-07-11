import { useState } from "react";

export default function useForm(initialState) {
  const [fields, setForm] = useState(initialState);
  function handleChange({ target: { name, value } }) {
    setForm({ ...fields, [name]: value });
  }
  return {
    fields,
    handleChange
  };
}
