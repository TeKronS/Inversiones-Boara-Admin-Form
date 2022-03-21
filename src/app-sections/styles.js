import styled from "styled-components";

const color = {
  azul: "#021323",
  amarillo1: "#FFCD00",
  amarillo2: "#ebb441",
  gris: "#8B8B8B"
};

export const Header = styled.header`
  display: grid;
  grid-template-columns: 130px minmax(0, 1fr);
  grid-template-rows: 100px;
  background: ${color.azul};
  color: ${color.amarillo1};
`;

export const BannerArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0 15px;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
  h2 {
    max-width: 100%;
    max-height: 100%;
    text-align: center;
  }
`;

export const Main = styled.main`
  background: ${color.amarillo2};
  padding: 0 10px;
  min-height: 100vh;
  max-height: 820px;
`;

export const Footer = styled.footer`
  display: grid;
  grid-template-columns: 1fr;
  padding: 5px;
  border-top: 4px solid ${color.azul};
  background: ${color.amarillo2};
  border-bottom: 4px solid ${color.azul};
  justify-content: center;
`;

export const Copyright = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-weight: bold;
`;
