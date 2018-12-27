import React from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { H2 } from "UI/Heading";
import { lowercasify } from "utils";
import { useForm } from "hooks";
import globalAuth from "auth";
import { ADMIN_PROFILE } from "routes";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-basis: 40%;
  padding: 24px;
  & > input:last-of-type {
    margin: 0 0 24px 0;
  }
`;

const StyledInput = styled.input.attrs(({ type, name }) => ({
  type,
  name
}))`
  margin-bottom: 10px;
  border: none;
  outline: 0;
  outline-offset: 0;
  border-radius: 4px;
  border: ${({ theme }) => `2px solid ${theme.colors.lightGrey}`};
  padding: 6px 12px;
  background-color: ${({ theme, color }) => (color ? theme.colors[color] : "transparent")};
  &:focus {
    border: ${({ theme }) => `2px solid ${theme.colors.secondary}`};
  }
  &[readonly] {
    opacity: 0.5;
  }
`;

function FormLogin({ auth, login }) {
  const { fields, handleChange } = useForm({ email: "", password: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    if (auth.isLoading) return;
    login(fields);
  }

  const { isLoading } = auth;

  return globalAuth.isLogged() ? (
    <Redirect to={ADMIN_PROFILE} />
  ) : (
    <StyledForm onSubmit={handleSubmit}>
      <H2 color={"primary"}>Login</H2>
      {[{ name: "email" }, { name: "password" }].map(({ name }) => (
        <StyledInput
          key={name}
          autoComplete={lowercasify(`${process.env.REACT_APP_APPNAME}-${name}`)}
          name={name}
          type={name}
          value={fields[name]}
          onChange={handleChange}
          readOnly={isLoading}
        />
      ))}
      <StyledInput type={"submit"} color={"secondary"} value={"Valider"} disabled={isLoading} />
      <a href="#" style={{ marginTop: "auto" }}>
        Reset password
      </a>
    </StyledForm>
  );
}

export default FormLogin;
