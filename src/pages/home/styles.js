import styled from "styled-components";

const color = {
  azul: "#021323",
  amarillo1: "#FFCD00",
  amarillo2: "#ebb441",
  gris: "#8B8B8B"
};

export const Body = styled.section`
  display: grid;
  grid-template-rows: 60px 1fr 40px;
  min-height: 350px;
  height: calc(100% - 22px);
  max-width: 720px;
  overflow: hidden;
  margin: 10px auto;
  border: 1px solid;
  border-radius: 4px;
`;

export const Title = styled.h2`
  font-size: 33px;
  text-align: center;
  margin: 10px 3px;
  @media screen and (max-width: 410px) {
    font-size: 23px;
  }
`;
export const SubTitle = styled.h3`
  font-size: 25px;
  text-align: center;
  margin: 10px 3px;
  height: 100%;
  @media screen and (max-width: 410px) {
    font-size: 18px;
  }
`;
export const Fill = styled.div`
  display: flex;
  height: 100%;
`;

export const TitleSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid;

  button {
    border: none;
    margin: 0;
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;
    height: 100%;
    :hover {
      background: ${color.gris};
    }
  }
`;

export const MainSection = styled.section`
  display: grid;
  grid-template-rows: 40px 1fr;
  min-height: calc(100% - 20px);
  border: 1px solid;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Section = styled.section`
  display: flex;
  min-height: 100%;
  justify-items: space-around;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

export const BottonLogOut = styled.button`
  height: 40px;
  min-width: 100%;
  font-size: 19px;
  background: ${color.azul};
  color: ${color.amarillo1};
  cursor: pointer;
  transition: 150ms ease-in-out 0s;
  :hover {
    background: ${color.gris};
    color: ${color.azul};
  }
`;

export const BottonSecction = styled.button`
  height: 20%;
  padding: 5px;
  line-height: 11px;
  max-height: 100px;
  width: 95%;
  max-width: 800px;
  font-size: 21px;
  background: black;
  border-radius: 5px;
  border: 4px solid;
  color: white;
  cursor: pointer;
  box-shadow: 1px -1px 5px -1px ${color.azul};

  :hover {
    background: ${color.gris};
    color: ${color.azul};
  }
`;
export const Input = styled.input`
  margin: 5px 0;
  height: 50px;
  padding: 1px 5px;
  border-radius: 9px;
  font-size: 20px;
  width: 220px;
  text-align: center;
  box-shadow: 1px -1px 5px -1px #021323;
  border: 1px solid #021323;
`;

export const Button = styled.button`
  margin-top: 25px;
  font-size: 24px;
  font-weight: bold;
  border-radius: 999px;
  padding: 5px 15px;
  cursor: pointer;
  border: 3px solid white;
  box-shadow: 1px -1px 20px -1px #021323;
  background: #021323;
  color: #ffcd00;
  transition: 150ms ease-in-out 0s;

  :hover {
    background: #8b8b8b;
  }
  :active {
    background: black;
  }
`;
