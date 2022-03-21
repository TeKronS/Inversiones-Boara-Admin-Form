import styled from "styled-components";

export const Body = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px 7px 40px 7px;
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

export const TextArea = styled.textarea`
  border-radius: 4px;
  margin: 10px;
  overflow: hidden;
  resize: none;
  font-size: 20px;
  box-shadow: 1px -1px 5px -1px #021323;
  width: 100%;
  max-width: 500px;
  margin: 10px;
  min-height: 100px;
  box-sizing: border-box;
  padding: 10px 7px;
`;
