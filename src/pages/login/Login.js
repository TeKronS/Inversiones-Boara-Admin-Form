import { useEffect, useRef, useContext } from "react";
import { Body } from "./styles.js";
import { LoginBox } from "./../../components/LoginBox/Login";
import { useNavigate } from "react-router-dom";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

export const Login = ({ logIn, user }) => {
  const navigate = useNavigate();
  const blockRef = useRef(null);
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (user) navigate("/");
  });
  useEffect(() => {
    if (user === false) {
      blockRef.current = navigator.block();
    }
  }, []);

  function disableBlock() {
    blockRef.current();
  }
  return (
    <Body>
      <h2>Inicia Sesión</h2>
      <LoginBox logIn={logIn} callBack={disableBlock} />
    </Body>
  );
};
