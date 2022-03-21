import styled from "styled-components";

export const BodyInputLogin = styled.div`
  margin: 50px auto;
  width: 95%;
  max-width: 300px;
  max-height: 300px;
  border: 1px solid #021323;
  border-radius: 7px;
  text-align: center;
  display: flex;
  flex-direction: column;
  font-size: 17px;
  font-weight: 555;
  color: #021323;
  gap: 10px;
  box-sizing: border-box;
  box-shadow: 1px -1px 5px -1px #021323;
  border-radius: 4px;
  div {
    display: flex;
    flex-direction: column;
    margin: 20px 15px 5px;
    gap: 7px;
    input {
      padding: 0 10px;
      line-height: 35px;
      border-radius: 5px;
    }
  }
`;
export const Button = styled.button`
  padding: 0 17px 4px;
  background: #021323;
  color: white;
  line-height: 35px;
  height: 40px;
  border-radius: 7px;
  margin: 12px auto;
  box-shadow: 1px -1px 5px -15px #275a46;
  font-weight: 550;
  cursor: pointer;
  :hover {
    background: #055393;
  }
`;
