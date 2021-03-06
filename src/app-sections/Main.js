import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Main } from "./styles";
import { Login } from "./../pages/login/Login";
import { Home } from "./../pages/home/Home";
import { Error } from "./../pages/error/Error";
import {
  signInWithEmailAndPasswords,
  signOuts,
  getTotalData,
  onAuthStateChangeds,
} from "./../firebase/firebase-config";
import { useNavigate, useLocation } from "react-router-dom";

export const MainSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null); //Default Value is null
  const [data, setData] = useState(null);

  //-----------------------------------
  useEffect(() => {
    onAuthStateChangeds(setUser); // Disabled for testing

    if (location.pathname === "/login") {
      navigate("/login", { replace: false });
    } else {
      navigate("/Inversiones-Boara-Admin-Form", { replace: false });
    }
  }, []);

  useEffect(() => {
    if (user) {
      getTotalData().then((response) => {
        if (response) {
          setData(response);
        } else {
          navigate("/error");
        }
      });
    } else {
      navigate("/login");
    }
  }, [user]);

  async function logIn(email, pass, disableBlock) {
    const dataUser = await signInWithEmailAndPasswords(email, pass);
    if (dataUser) {
      disableBlock();
      setUser(dataUser);
      return true;
    } else {
      return false;
    }
  }

  function logOut() {
    signOuts()
      .then(() => setUser(null))
      .catch((error) => console.log(error));
  }

  return (
    <Main>
      <Routes>
        <Route
          path={"/Inversiones-Boara-Admin-Form"}
          element={<Home logOut={logOut} user={user} data={data} />}
        />
        <Route path={"/login"} element={<Login user={user} logIn={logIn} />} />
        <Route path={"/error"} element={<Error ser={user} />} data={data} />
      </Routes>
    </Main>
  );
};
