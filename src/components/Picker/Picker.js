import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { B1, B2 } from "../Fonts/Fonts";

const Container = styled.div`
  margin-bottom: 1rem;
`;

const PickerLabel = styled(B1)`
  margin-bottom: 0.25rem;
`;

const ValueLabel = styled(B2)`
  color: ${props => props.theme.colors.foreground.secondary};
  margin-left: 0.25rem;
`;

const ValueIcon = styled(FontAwesomeIcon)`
  color: ${props => props.theme.colors.foreground.default};
  margin-right: 0.25rem;
`;

const ValueContainer = styled.div`
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: ${props => `1px solid ${props.theme.colors.background.default}`};
`;

const Picker = ({ label, value, onClick, ...otherProps }) => (
  <Container>
    {label && <PickerLabel>{label}</PickerLabel>}
    <ValueContainer onClick={onClick} {...otherProps}>
      <ValueLabel>{value}</ValueLabel>
      <ValueIcon icon="chevron-right" />
    </ValueContainer>
  </Container>
);

Picker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func
};

Picker.defaultProps = {
  value: "Choose",
  onClick: () => {}
};

export default Picker;
