import { Link } from "react-router-dom";
import { Header, BannerArea } from "./styles";
import { LogoIB } from "./../components/LogoIB/LogoIB";

export const HeaderSection = () => {
  return (
    <Header>
      <Link to="/">
        <LogoIB />
      </Link>
      <BannerArea>
        <h2>IB Admin Testing</h2>
      </BannerArea>
    </Header>
  );
};