import { useEffect } from "react";
import { Body } from "./styles.js";
import { useNavigate } from "react-router-dom";

export const Error = ({ user, data }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user && data) navigate("/");
  });

  return (
    <Body>
      Error<a href={"/"}>Recargar</a>
    </Body>
  );
};
