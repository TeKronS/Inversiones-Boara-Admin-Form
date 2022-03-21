import { useState, useRef, useEffect } from "react";
import { ImageComponent } from "./../../../components/ImageUpload/ImageUpload";
import { Body, Label, TextArea } from "./styles";
import { Button } from "./../styles";
import { DatePickerComponent } from "./../../../components/DatePicker/DatePiker";
import { Timestamp } from "firebase/firestore";

export const InputHistory = ({ setItem, item }) => {
  const [load, ReLoad] = useState(0);
  //----------------------------------
  const imageState = useRef(item ? [] : ["null"]);
  const buttonRef = useRef(null);
  const refTextArea = useRef(null);
  //--------------------------
  const content = useRef(
    item
      ? {
          history: item.historia,
          date: new Date(item.fecha.seconds * 1000),
          imgURL: [item.imagen]
        }
      : {
          history: null,
          date: null,
          imgURL: []
        }
  );
  //---------------------------
  useEffect(() => {
    refTextArea.current.style.height = `${refTextArea.current.scrollHeight}px`;
  }, []);
  //-------------------------
  function historyChanged(e) {
    content.current.history = e.target.value;
    isEnableButtonNext();
    e.target.style.height = `${e.target.scrollHeight - 6}px`;
  }

  function dateChanged(date) {
    content.current.date = date;
    isEnableButtonNext();
  }

  function setImageState(state) {
    if (state) imageState.current = state;
    isEnableButtonNext();
    return imageState.current;
  }

  function setImageUrl(urls) {
    if (urls) content.current.imgURL = urls;
    isEnableButtonNext();
    return content.current.imgURL;
  }

  function reset() {
    content.current = {
      history: null,
      date: null,
      imgURL: []
    };
    imageState.current = ["null"];
    ReLoad(load + 1);
  }

  function send() {
    if (ok()) {
      setItem({
        historia: content.current.history,
        fecha: Timestamp.fromDate(content.current.date),
        imagen: content.current.imgURL[0]
      });
      reset();
    }
  }
  function ok() {
    return (
      content.current.imgURL.length &&
      content.current.date &&
      content.current.history &&
      imageState.current[0] !== "null" &&
      imageState.current.length === 0
    );
  }
  function isEnableButtonNext() {
    if (ok()) {
      buttonRef.current.classList.remove("disabled");
    } else {
      buttonRef.current.classList.add("disabled");
    }
  }

  return (
    <Body key={load}>
      <Label htmlFor={"history"}>Historia</Label>
      <TextArea
        ref={refTextArea}
        id={"history"}
        onChange={historyChanged}
        type={"text"}
        defaultValue={content.current.history}
      ></TextArea>
      <Label htmlFor={"date"}>Fecha</Label>
      <DatePickerComponent
        setDate={dateChanged}
        isDate={content.current.date}
      />
      <ImageComponent
        label={"Foto"}
        max={1}
        color={"#021323"}
        setImageUrl={setImageUrl}
        isEnableButtonNext={isEnableButtonNext}
        setImageState={setImageState}
        height={200}
        quality={0.5}
        imgChild={content.current.imgURL}
      />
      <Button onClick={send} ref={buttonRef} className={"disabled"}>
        {item ? "Guardar" : "Agregar"}
      </Button>
    </Body>
  );
};
