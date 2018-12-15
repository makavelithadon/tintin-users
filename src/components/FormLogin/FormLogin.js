import React from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 60%;
  padding: 24px;
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
  border: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};
  background: transparent;
  padding: 6px 12px;
`;

export default class FormLogin extends React.Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });
  render() {
    const { email, password } = this.state;
    return (
      <StyledForm onSubmit={e => e.preventDefault()}>
        <StyledInput name={"email"} type="text" value={email} onChange={this.handleChange} />
        <StyledInput name={"password"} type="password" value={password} onChange={this.handleChange} />
      </StyledForm>
    );
  }
}
