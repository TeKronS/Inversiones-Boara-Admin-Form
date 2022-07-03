import { useState, useRef } from "react";
import { ImageComponent } from "./../../../components/ImageUpload/ImageUpload";
import { Body, Label } from "./styles";
import { Input, Button } from "./../styles";

export const InputArragament = ({ item, setItem }) => {
  const [load, ReLoad] = useState(0);
  const [price, setPrice] = useState("");

  //----------------------------------
  const imageState = useRef(item ? [] : ["null"]);
  const buttonRef = useRef(null);
  //--------------------------
  const content = useRef(
    item
      ? {
          title: item.titulo,
          price: item.precio,
          imgURL: [item.imagen],
        }
      : {
          title: null,
          price: null,
          imgURL: [],
        }
  );
  //---------------------------
  function titleChanged(e) {
    content.current.title = e.target.value;
    isEnableButtonNext();
  }
  function priceChanged(e) {
    const newPrice = Number(e.target.value);

    if (newPrice > 0) {
      content.current.price = newPrice;
      setPrice(newPrice);
    } else {
      setPrice("");
      content.current.price = null;
    }
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
      title: null,
      price: null,
      imgURL: [],
    };
    imageState.current = ["null"];
    ReLoad(load + 1);
  }

  function send() {
    if (ok()) {
      setItem({
        titulo: content.current.title,
        precio: content.current.price,
        imagen: content.current.imgURL[0],
      });
      reset();
    }
  }
  function ok() {
    return (
      content.current.imgURL.length &&
      content.current.price &&
      content.current.title &&
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
      <Label htmlFor={"title"}>Titulo</Label>
      <Input
        id={"title"}
        defaultValue={content.current.title}
        onChange={titleChanged}
        type={"text"}
      />
      <Label htmlFor={"price"}>Precio</Label>
      <Input
        onWheel={(e) => {
          e.target.blur();
        }}
        defaultValue={content.current.price}
        id={"price"}
        onChange={priceChanged}
        value={price}
        type={"number"}
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
