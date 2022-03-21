import styled from "styled-components";

export const Body = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px 0 40px 0;
  align-items: center;

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
  .disabled {
    opacity: 0.6;
    pointer-events: none;
  }
`;

export const Label = styled.label`
  font-size: 24px;
  font-weight: bold;
`;
