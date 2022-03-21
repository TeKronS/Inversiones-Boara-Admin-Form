import { useState } from "react";
import { Section, Button, BottonSecction, Fill, Title, Input } from "./styles";
import { ACTION_TYPE } from "./../../constantes";

export const Stage1 = ({ selectOption }) => {
  return (
    <Section>
      <BottonSecction id={ACTION_TYPE.editSection} onClick={selectOption}>
        Editar Seccion
      </BottonSecction>
      <BottonSecction id={ACTION_TYPE.addSection} onClick={selectOption}>
        Añadir Seccion
      </BottonSecction>
      <BottonSecction id={ACTION_TYPE.deleteSection} onClick={selectOption}>
        Eliminar Seccion
      </BottonSecction>
    </Section>
  );
};

export const Stage2 = ({ selectOption }) => {
  return (
    <Section>
      <BottonSecction id={ACTION_TYPE.add} onClick={selectOption}>
        Añadir
      </BottonSecction>
      <BottonSecction id={ACTION_TYPE.edit} onClick={selectOption}>
        Editar
      </BottonSecction>
      <BottonSecction id={ACTION_TYPE.delete} onClick={selectOption}>
        Eliminar
      </BottonSecction>
    </Section>
  );
};

export const Stage3 = ({ createSection }) => {
  const [name, setName] = useState("");

  function namechanged(e) {
    setName(e.target.value);
  }

  return (
    <Section>
      <Title>Coloque el nombre de la nueva Seccion</Title>
      <Input value={name} onChange={namechanged} type={"text"} />
      <Button
        onClick={() => {
          createSection(name);
        }}
      >
        Crear
      </Button>
      <Fill />
    </Section>
  );
};
