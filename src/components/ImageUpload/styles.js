import styled from "styled-components";
import spiner from "./spiner.svg";

export const SectionImg = styled.section`
  display: grid;
  overflow: auto !important;
  grid-template-rows: minmax(20px, 40px) 50px auto;
  input[type="file"] {
    font-size: 19px;
    color: transparent;
  }
  .spinner {
    background-image: url(${spiner});
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

export const BoxImg = styled.div`
  background: white;
  box-shadow: 1px -1px 5px -1px ${(props) => props.color};
  border: 1px solid ${(props) => props.color};
  border-radius: 5px;
  min-height: ${(props) => props.height};
  min-width: ${(props) => props.height};
  max-width: calc(100% - 20px);
  padding: 10px;
  display: flex;
  margin: 10px auto;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: space-around;
  div {
    display: flex;
    position: relative;
    min-width: ${(props) => props.height};
    height: ${(props) => props.height};
    border: 2px solid burlywood;
    max-width: 100%;
  }
  button {
    cursor: pointer;
    position: absolute;
    right: 0;
    opacity: 0.5;
    top: 0;
    border: 2px solid;
    border-radius: 999px;
    :hover {
      opacity: 1;
    }
  }
  img {
    max-width: 100%;
    margin: auto;
    object-fit: contain;
  }
  iframe {
    margin: 0 auto;
    position: absolute;
    left: 50%;
    margin-left: -55px;
    width: 110px;
    height: 110px;
    border: none !important;
  }
`;
export const Label = styled.label`
  display: flex;
  justify-content: center;
  color: ${(props) => props.color};
  text-align: center;
  font-size: 24px;
  font-weight: 555;
  height: 20px;
  margin: 5px auto;
`;

export const Input = styled.input`
  margin: auto;
  width: ${(props) => props.width};
  padding-bottom: 10px;
  box-shadow: 1px -1px 5px -1px ${(props) => props.color};
  border-radius: 99px;
  border: 1px solid ${(props) => props.color};
  padding: 10px;
  transition: 250ms ease-in-out 0s;
  cursor: pointer;
  ::file-selector-button {
    border-radius: 99px !important;
    cursor: pointer;
  }
`;
