import { useEffect } from "react";
import { Body } from "./styles.js";
import { useNavigate } from "react-router-dom";

export const Error = ({ user, data }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user && data) navigate("/Inversiones-Boara-Admin-Form");
  });

  return (
    <Body>
      Error<a href={"/Inversiones-Boara-Admin-Form"}>Recargar</a>
    </Body>
  );
};
