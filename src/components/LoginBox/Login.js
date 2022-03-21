import { useState, useRef } from "react";
import { BodyInputLogin, Button } from "./styles";

//-------------------------------
export const LoginBox = ({ logIn, callBack }) => {
  const RefButton = useRef(null);

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  function onChangeUser(e) {
    setUser(e.target.value);
  }

  function onChangePass(e) {
    setPass(e.target.value);
  }

  async function handleSumbit(e) {
    e.preventDefault();
    RefButton.current.classList.toggle("disable");
    setUser("");
    setPass("");
    const ifLogin = await logIn(user, pass, callBack);
    if (!ifLogin) {
      RefButton.current.classList.toggle("disable");
    }
  }
  //--------------------------------
  return (
    <BodyInputLogin>
      <form onSubmit={handleSumbit}>
        <div>
          <label htmlFor={"email"}>Correo</label>
          <input
            onChange={onChangeUser}
            type={"email"}
            id={"email"}
            name={"email"}
            value={`${user}`}
            required
          />
        </div>
        <div>
          <label htmlFor={"pass"}>Contraseña </label>
          <input
            onChange={onChangePass}
            type={"password"}
            id={"pass"}
            name={"password"}
            value={`${pass}`}
            required
          />
        </div>
        <Button ref={RefButton}>Ingresar</Button>
      </form>
    </BodyInputLogin>
  );
};
