import { HeaderSection } from "./app-sections/Header";
import { MainSection } from "./app-sections/Main";
import { FooterSection } from "./app-sections/Footer";
import "./styles.css";
import styled from "styled-components";

export const App = () => {
  return (
    <Body>
      <HeaderSection />
      <MainSection />
      <FooterSection />
    </Body>
  );
};

const Body = styled.div`
  display: grid;
  grid-template-rows: 98px 1fr 60px;
  grid-template-columns: 100%;
  max-width: 100vw;
  width: 100vw;
  min-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
`;
