import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { B1 } from "../Fonts/Fonts";

const Container = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled(B1)`
  margin-bottom: 0.25rem;
`;

const StyledInput = styled.input`
  width: fill-available;
  height: 2rem;
  padding: 0.25rem;
  background-color: ${props => props.theme.colors.background.default};
  font-size: ${props => props.theme.fonts.b1.size};
  font-weight: ${props => props.theme.fonts.b1.weight};
  letter-spacing: ${props => props.theme.fonts.b1.letterspacing};
  color: ${props => props.theme.colors.background.tertiary};
  border: none;
  ::placeholder {
    color: ${props => props.theme.colors.background.secondary};
  }
`;

const Input = ({ label, placeholder, input, type, ...otherProps }) => (
  <Container>
    {label && <Label>{label}</Label>}
    <StyledInput
      type={type}
      {...input}
      placeholder={placeholder}
      {...otherProps}
    />
  </Container>
);

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  input: PropTypes.object.isRequired
};

export default Input;
