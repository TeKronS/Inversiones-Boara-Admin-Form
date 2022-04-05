import { useRef, useState, useEffect } from "react";
import { getUploadTask, getImageURL } from "./../../firebase/firebase-storage";
import { SectionImg, BoxImg, Label, Input } from "./styles";
import Compressor from "compressorjs";

export const ImageComponent = ({
  isEnableButtonNext,
  setImageState,
  setImageUrl,
  label = "Fotos",
  max = 6,
  color = "black",
  height = 110,
  quality = 1,
  imgChild = [],
}) => {
  const [keyState, setKey] = useState(1);
  const imgElement = useRef(null);
  const isMount = useRef(true);
  //-----

  useEffect(() => {
    if (imgChild.length) {
      imgChild.forEach(addPreviewImg);
    }
    return () => {
      isMount.current = false;
    };
  }, []);

  function getUrl(uploadTask, childrenPosition) {
    if (uploadTask) {
      const onProgress = () => {};
      const onError = (e) => {
        if (isMount.current) {
          alert(e);
          imgElement.current.removeChild(
            imgElement.current.children[childrenPosition]
          );
        }
      };
      const onComplete = () => {
        if (isMount.current) {
          const imgState = setImageState();
          const newImgState = removeItemFromArr(imgState, childrenPosition);
          setImageState(newImgState);
          getImageURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              imgElement.current.children[childrenPosition].removeChild(
                imgElement.current.children[childrenPosition].children[0]
              );
              imgElement.current.children[childrenPosition].style.opacity = 1;
              imgElement.current.children[childrenPosition].id = downloadURL;
              const urls = setImageUrl();
              urls.push(downloadURL);
              setImageUrl(urls);
              isEnableButtonNext();
            })
            .catch((e) => {
              console.log("error", e);
              imgElement.current.removeChild(
                imgElement.current.children[childrenPosition]
              );
              isEnableButtonNext();
            });
        }
      };

      uploadTask.on("state_changed", onProgress, onError, onComplete);
    }
  }
  //------------
  function addImg(key, file, children) {
    const reader = new FileReader();
    const childrenPosition = children + key;
    const imgState = setImageState();
    imgState.push(childrenPosition);
    setImageState(imgState);
    reader.addEventListener("load", function (e) {
      if (isMount.current) {
        addPreviewImg(e.target.result, true);
        isEnableButtonNext();
      }
    });
    reader.readAsDataURL(file);
    optimizeImage(file, childrenPosition);
  }

  function addPreviewImg(url, isPreload = false) {
    const newDiv = document.createElement("div");
    const newButtonX = document.createElement("button");
    const image = new Image();
    if (isPreload === true) {
      newDiv.style.opacity = 0.5;
      const imageSvg = document.createElement("iframe");
      imageSvg.classList.add("spinner");
      newDiv.appendChild(imageSvg);
    } else {
      newDiv.style.opacity = 1;
    }
    newDiv.id = url;
    image.height = height;
    image.src = url;
    newButtonX.innerHTML = "X";
    newButtonX.type = "button";
    newDiv.appendChild(image);
    newDiv.appendChild(newButtonX);
    imgElement.current.appendChild(newDiv);
  }

  function UploadImage(blob, childrenPosition) {
    const uploadTask = getUploadTask(blob);
    getUrl(uploadTask, childrenPosition);
  }

  function optimizeImage(file, childrenPosition) {
    const fecha = new Date();
    const time = fecha.getTime();
    new Compressor(file, {
      quality: quality,
      success(result) {
        if (isMount.current) {
          if (result instanceof File) {
            async function fileConvert() {
              let newresult = await fileToBlob(result);
              newresult.name = `${time}${result.name}`;
              UploadImage(newresult, childrenPosition);
            }
            fileConvert();
          } else {
            result.name = `${time}${result.name}`;
            UploadImage(result, childrenPosition);
          }
        }
      },
      error(err) {
        if (isMount.current) {
          console.log(err.message);
          imgElement.current.removeChild(
            imgElement.current.children[childrenPosition]
          );
        }
      },
    });
  }
  //----------
  function removeImg(e) {
    if (e.target.tagName === "BUTTON") {
      const element = e.target.parentNode;
      if (element.style.opacity === "1") {
        const imgUrl = element.id;
        const contentImgUrl = setImageUrl();
        const url = removeItemFromArr(contentImgUrl, imgUrl);
        setImageUrl(url);
        imgElement.current.removeChild(element);
        if (imgElement.current.childElementCount === 0) {
          setImageState(["null"]);
        }
        isEnableButtonNext();
      }
    }
  }
  //-------------------------------
  function viewImg(e) {
    const files = e.target.files;
    const countFiles = Object.values(files).length;
    const imgState = setImageState();
    setKey(keyState + 1);
    if (files) {
      if (setImageUrl().length === imgElement.current.childElementCount) {
        if (imgState[0] === "null") {
          setImageState([]);
        } else {
          if (max === 1) {
            setImageState([]);
            removeAllchild();
            setImageUrl([]);
          }
        }
        if (max < countFiles + setImageUrl().length) {
          alert("Número máximo de imagenes excedido");
          return;
        }
        const children = imgElement.current.childElementCount;
        Object.values(files).forEach(async (file, key) => {
          if (file.type.startsWith("image/")) {
            addImg(key, file, children);
          }
        });
      } else {
        alert("Elementos cargando");
      }
    }
  }
  //-------------------

  function removeAllchild() {
    if (imgElement.current.childElementCount > 0) {
      Object.values(imgElement.current.children).forEach((e) => {
        imgElement.current.removeChild(e);
      });
    }
  }

  //---------------------------------

  return (
    <SectionImg>
      <Label color={color} htmlFor={"fotos"}>
        {label}
      </Label>
      {max > 1 ? (
        <Input
          key={keyState}
          id={"fotos"}
          type={"file"}
          accept="image/png,image/jpeg,image/jpg"
          multiple
          onChange={viewImg}
          width={"140px"}
          color={color}
        />
      ) : (
        <Input
          key={keyState}
          id={"fotos"}
          type={"file"}
          accept="image/png,image/jpeg,image/jpg"
          onChange={viewImg}
          width={"181px"}
          color={color}
        />
      )}
      <BoxImg
        height={`${height}px`}
        onClick={removeImg}
        ref={imgElement}
        color={color}
      />
    </SectionImg>
  );
};

const ImageChild = () => {
  return (
    <div>
      <iframe title={"ads"} className={"spinner"} />
      <img alt={""} />
      <button type={"button"}>X</button>
    </div>
  );
};

function removeItemFromArr(arr, item) {
  return arr.filter(function (e) {
    return e !== item;
  });
}

async function fileToBlob(fileResult) {
  const blob = new Blob([new Uint8Array(await fileResult.arrayBuffer())], {
    type: fileResult.type,
  });
  return blob;
}
