import { useState, useRef, useEffect, useContext } from "react";
import { SECTIONS, ACTION_TYPE } from "./../../constantes";
import {
  Body,
  Title,
  MainSection,
  SubTitle,
  TitleSection,
  BottonLogOut,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { SectorSelector } from "./SectionSelector";
import { Stage1, Stage2, Stage3 } from "./Stages";
import { InputArragament } from "./InputArragament/Arrangement";
import { InputHistory } from "./InputHistory/InputHistory";
import {
  ListArragaments,
  ListSection,
  ListHistory,
} from "./../../components/ListsComponent/Lists";
import {
  addItem,
  addItemDoc,
  deleteItem,
  newSection,
} from "./../../firebase/firebase-firestore";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

//--------------------------------------------------
export const Home = ({ logOut, user, data }) => {
  const navigate = useNavigate();
  const { navigator } = useContext(NavigationContext);

  //Esta variable de estado controla todo lo que se hace en la pagina
  const [state, setState] = useState({
    section: null,
    stage: null,
    type: null,
    subSection: null,
    item: null,
    newSection: null,
  });
  //esta variable obtiene el array necesario para las listas
  const list = state.newSection
    ? {}
    : state.subSection
    ? data[state.section][state.subSection]
    : data && data[state.section];

  //-------REF--------------------
  const prevStage = useRef([]);
  const positionStage = useRef(0);
  const blockRef = useRef(null);
  const actualStateRef = useRef(null);
  actualStateRef.current = state;

  //-----------------------------
  useEffect(() => {
    if (!user) navigate("/login");
  });
  //este efecto bloquea la navegacion y ejecuta la funcion de ir atras del formulario
  useEffect(() => {
    if (user) {
      blockRef.current = navigator.block(previews);
    }
  }, [navigator, user]);

  function SelectSeccion(e) {
    const id = e.target.id;
    setListPrevStage();
    let stage;
    if (id === SECTIONS.arreglos || id === SECTIONS.complementos) {
      stage = 1;
    } else if (id === SECTIONS.recomendados || id === SECTIONS.reseñas) {
      stage = 2;
    }
    setState({ ...state, stage, section: id });
  }

  function selectOptionSatage1(e) {
    const id = e.target.id;
    setListPrevStage();
    if (id === ACTION_TYPE.addSection) {
      setState({ ...state, stage: 3, type: id });
      return;
    }
    setState({ ...state, stage: 4, type: id });
  }

  function selectOptionSatage2(e) {
    const id = e.target.id;
    setListPrevStage();
    if (id === ACTION_TYPE.add) {
      setState({ ...state, stage: 5, type: id });
      return;
    }
    if (state.section === SECTIONS.reseñas) {
      setState({ ...state, stage: 6, type: id });
    } else {
      setState({ ...state, stage: 4, type: id });
    }
  }
  //esta funcion crea una nueva subSeccion pero de forma local
  function createSubSection(name) {
    setListPrevStage();
    setState({ ...state, stage: 5, type: ACTION_TYPE.add, newSection: name });
  }
  //------funciones añade historial a la variable de Estados------
  function setListPrevStage() {
    let actualPrevStage;
    if (positionStage.current < prevStage.current.length) {
      actualPrevStage = prevStage.current.slice(0, positionStage.current);
    } else {
      actualPrevStage = prevStage.current;
    }
    actualPrevStage.push(state);
    prevStage.current = actualPrevStage;
    positionStage.current = positionStage.current + 1;
  }

  function previews() {
    if (positionStage.current > 0) {
      if (prevStage.current.length === positionStage.current) {
        let actualPrevStage = prevStage.current;
        actualPrevStage.push(actualStateRef.current);
        prevStage.current = actualPrevStage;
      }
      setState(prevStage.current[positionStage.current - 1]);
      positionStage.current = positionStage.current - 1;
    }
  }
  function nextViews() {
    if (prevStage.current.length > positionStage.current + 1) {
      setState(prevStage.current[positionStage.current + 1]);
      positionStage.current = positionStage.current + 1;
    }
  }
  //-----------------------------------

  function SelectSubSection(e) {
    if (state.type === ACTION_TYPE.editSection) {
      setListPrevStage();
      setState({
        ...state,
        stage: 2,
        type: ACTION_TYPE.edit,
        subSection: e.target.id,
      });
      return;
    }
    if (e.target.tagName === "DIV") {
      const item = data[state.section][e.target.parentNode.id];
      deleteItem({ section: state.section, id: e.target.parentNode.id }).then(
        (response) => {
          if (!response) {
            data[state.section][e.target.parentNode.id] = item;
            setState({ ...state });
          }
        }
      );
      delete data[state.section][e.target.parentNode.id];
      setState({ ...state });
    }
  }
  //--------------------
  function selectItem(e) {
    if (state.type === ACTION_TYPE.edit) {
      setListPrevStage();
      setState({ ...state, stage: 5, item: e.target.id });
      return;
    }
    if (e.target.tagName === "DIV") {
      let item;
      if (state.subSection) {
        item = data[state.section][state.subSection][e.target.parentNode.id];
        delete data[state.section][state.subSection][e.target.parentNode.id];
      } else {
        item = data[state.section][e.target.parentNode.id];
        delete data[state.section][e.target.parentNode.id];
      }
      deleteItem({
        section: state.section,
        subSection: state.subSection,
        id: e.target.parentNode.id,
      }).then((response) => {
        if (!response) {
          if (state.subSection) {
            data[state.section][state.subSection][e.target.parentNode.id] =
              item;
          } else {
            data[state.section][e.target.parentNode.id] = item;
          }
          setState({ ...state });
        }
      });
      setState({ ...state });
    }
  }
  //-----------------------
  function SelectHistory(e) {
    if (state.type === ACTION_TYPE.edit) {
      setListPrevStage();
      setState({ ...state, stage: 5, item: e.target.id });
      return;
    }
    if (e.target.tagName === "DIV") {
      const id = e.target.parentNode.parentNode.id;
      const item = data[state.section][id];
      deleteItem({
        section: state.section,
        id: id,
      }).then((response) => {
        if (!response) {
          data[state.section][id] = item;
          setState({ ...state });
        }
      });
      delete data[state.section][id];
      setState({ ...state });
    }
  }

  function setItem(item) {
    //---Si añade Nueva Seccion-----
    const newSubSection = state.newSection;
    const fecha = new Date();
    const time = `${fecha.getTime()}`;
    const object = {};
    object[time] = item;
    if (newSubSection) {
      newSection({
        section: state.section,
        name: newSubSection,
        item: object,
      }).then((response) => {
        if (!response) {
          delete data[state.section][newSubSection];
          setState({
            ...state,
            subSection: null,
            newSection: newSubSection,
          });
        }
      });
      prevStage.current = [
        {
          section: null,
          stage: null,
          type: null,
          subSection: null,
          item: null,
          newSection: null,
        },
      ];
      positionStage.current = 1;
      data[state.section][newSubSection] = object;
      setState({ ...state, subSection: newSubSection, newSection: null });
      return;
    }
    //---Si añade dentro de una SubSeccion-----

    if (state.subSection) {
      let newItem = {};
      let editObject;
      let newID;

      if (state.item) {
        newID = state.item;
        editObject = data[state.section][state.subSection][state.item];
        newItem[state.item] = item;
        data[state.section][state.subSection][state.item] = item;
        previews();
      } else {
        newID = time;
        newItem = object;
        data[state.section][state.subSection][time] = item;
      }
      addItemDoc({
        section: state.section,
        item: newItem,
        subSection: state.subSection,
      }).then((response) => {
        if (!response) {
          if (editObject) {
            data[state.section][state.subSection][newID] = editObject;
          } else {
            delete data[state.section][state.subSection][newID];
          }
          setState({ ...state });
        }
      });
    } else {
      //---Si añade dentro de Recomendados y Reseñas-----
      let newID;
      let editObject;
      if (state.item) {
        newID = state.item;
        editObject = data[state.section][state.item];
        data[state.section][state.item] = item;
        previews();
      } else {
        newID = time;
        data[state.section][time] = item;
      }
      addItem({
        section: state.section,
        newID: newID,
        item: item,
      }).then((response) => {
        if (!response) {
          if (editObject) {
            data[state.section][newID] = editObject;
          } else {
            delete data[state.section][newID];
          }
          setState({ ...state });
        }
      });
    }
  }

  return (
    <Body>
      {data && user ? (
        <>
          <TitleSection>
            <button onClick={previews}>{`<`}</button>
            <Title>
              {state.section
                ? state.section.toUpperCase()
                : "Elije una Sección"}
            </Title>
            <button onClick={nextViews}>{`>`}</button>
          </TitleSection>

          {state.stage === null && (
            <SectorSelector SelectSeccion={SelectSeccion} />
          )}
          {state.stage > 0 && (
            <MainSection>
              <SubTitle>
                {state.type ? state.type.toUpperCase() : "Elije una Opción"}
                {state.subSection && ` ${state.subSection}`}
                {state.newSection && ` ${state.newSection}`}
              </SubTitle>
              {state.stage === 1 && (
                <Stage1 selectOption={selectOptionSatage1} />
              )}
              {state.stage === 2 && (
                <Stage2 selectOption={selectOptionSatage2} />
              )}
              {state.stage === 3 && <Stage3 createSection={createSubSection} />}

              {state.stage === 4 && (
                <>
                  {(state.type === ACTION_TYPE.edit ||
                    state.type === ACTION_TYPE.delete) && (
                    <ListArragaments
                      type={state.type}
                      clickFunc={selectItem}
                      data={list}
                    />
                  )}
                  {(state.type === ACTION_TYPE.editSection ||
                    state.type === ACTION_TYPE.deleteSection) && (
                    <ListSection
                      type={state.type}
                      clickFunc={SelectSubSection}
                      object={list}
                    />
                  )}
                </>
              )}
              {state.stage === 5 && (
                <>
                  {state.section === SECTIONS.reseñas ? (
                    <InputHistory setItem={setItem} item={list[state.item]} />
                  ) : (
                    <InputArragament
                      item={list[state.item]}
                      setItem={setItem}
                    />
                  )}
                </>
              )}
              {state.stage === 6 && (
                <ListHistory
                  type={state.type}
                  clickFunc={SelectHistory}
                  object={list}
                />
              )}
            </MainSection>
          )}
        </>
      ) : (
        <>
          <br />
          <Title>CARGANDO</Title>
        </>
      )}
      <BottonLogOut
        onClick={() => {
          //aqui se desbloquea la navegacion para poder navegar a la pagina de login
          blockRef.current();
          logOut();
        }}
      >
        Cerrar sesion
      </BottonLogOut>
    </Body>
  );
};
