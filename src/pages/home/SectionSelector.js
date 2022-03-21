import { Section, BottonSecction } from "./styles";
import { SECTIONS } from "./../../constantes";

export const SectorSelector = ({ SelectSeccion }) => {
  return (
    <Section>
      <BottonSecction id={SECTIONS.recomendados} onClick={SelectSeccion}>
        Recomendados
      </BottonSecction>
      <BottonSecction id={SECTIONS.arreglos} onClick={SelectSeccion}>
        Arreglos
      </BottonSecction>
      <BottonSecction id={SECTIONS.complementos} onClick={SelectSeccion}>
        Complementos
      </BottonSecction>
      <BottonSecction id={SECTIONS.reseñas} onClick={SelectSeccion}>
        Reseñas
      </BottonSecction>
    </Section>
  );
};
