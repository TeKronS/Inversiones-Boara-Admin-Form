import styled from "styled-components";

export const Body = styled.section`
  display: flex;
  min-height: 100vh;
  height: calc(100% - 22px);
  width: 100%;
  flex-direction: column;
  font-size: 30px;
  text-align: center;
  justify-content: center;
  color: red;
  a {
    margin-top: 20px;
    background: #021323;
    align-self: center;
    padding: 5px 15px;
    border: 3px solid white;
    border-radius: 999px;
    color: white;
    :visited {
      color: white;
    }
    :hover {
      color: red;
    }
  }
`;
