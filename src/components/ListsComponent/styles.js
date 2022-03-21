import styled from "styled-components";

export const Body = styled.section`
  display: flex;
  flex-direction: column;
  min-height: calc(100% - 20px);
  margin: 10px auto;
  border-radius: 4px;
  width: 100%;
  max-width: 470px;
  box-sizing: border-box;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  div {
    min-height: 10px;
  }
`;

export const Item = styled.article`
  display: grid;
  grid-template-columns: ${(props) => {
    return props.columns ? props.columns : "1fr 30px 50px 30px";
  }};
  pointer-events: ${(props) => props.click};
  grid-template-rows: repeat(auto-fill, 40px);
  background: white;
  margin: 3px;
  padding: 0 5px;
  line-height: 17px;
  align-items: center;
  font-size: 20px;
  border-radius: 5px;
  gap: 2px;
  cursor: ${(props) => props.cursor};
  border: 1px solid transparent;

  :hover {
    border: 1px solid ${(props) => props.border};
    background: #efeddc;
  }

  span {
    pointer-events: none;
  }

  div {
    pointer-events: all;
    cursor: pointer;
    display: flex;
    border-radius: 99px;
    border: 2px solid red;
    justify-content: center;
    align-items: center;
    color: #021323;
    background: #ffcd00;
    height: 30px;

    :hover {
      color: #ffcd00;
      background: #021323;
    }

    span {
      text-align: right;
      user-select: none;
    }
  }
`;

export const DeleteButton = styled.div`
  pointer-events: all;
  cursor: pointer;
  display: flex;
  border-radius: 99px;
  border: 2px solid red;
  justify-content: center;
  align-items: center;
  color: #021323;
  background: #ffcd00;
  height: 30px;

  :hover {
    color: #ffcd00;
    background: #021323;
  }

  span {
    user-select: none;
  }
`;

export const ItemHistory = styled.article`
  display: grid;
  grid-template-columns: 1fr 110px;
  pointer-events: ${(props) => props.click};
  overflow: hidden;
  grid-template-rows: repeat(auto-fill, 150px);
  background: white;
  margin: 3px;
  padding: 0 5px;
  min-height: 150px;
  line-height: 21px;
  align-items: center;
  font-size: 20px;
  border-radius: 5px;
  gap: 5px;
  cursor: ${(props) => props.cursor};
  border: 1px solid transparent;

  :hover {
    border: 1px solid ${(props) => props.border};
    background: #efeddc;
  }

  span {
    height: 100%;
    margin-top: 8px;
    pointer-events: none;
  }

  @media screen and (max-width: 355px) {
    grid-template-columns: minmax(50px, 1fr) 85px;
    font-size: 16px;
  }
`;

export const DateBox = styled.section`
  pointer-events: none;
  padding-left: 5px;
  height: 100%;
  display: grid;
  border-left: 3px solid black;
  text-align: center;
  align-content: space-around;

  span {
    margin-top: 0;
  }

  div {
    span {
      margin-top: 10px;
    }
  }
`;
