import {
  deleteField,
  deleteDoc,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase-config";
//-----------------------
export const addItemDoc = async ({ section, item, subSection }) => {
  const docRef = doc(db, section, subSection);
  return updateDoc(docRef, item).then(good).catch(fail);
};

export const addItem = async ({ section, newID, item }) => {
  const docRef = doc(db, section, newID);
  return await setDoc(docRef, item).then(good).catch(fail);
};

//-----------------------------------------
export const deleteItem = async ({ section, subSection, id }) => {
  if (subSection) {
    const object = {};
    object[id] = deleteField();
    const docRef = doc(db, section, subSection);
    return await updateDoc(docRef, object).then(goodDelete).catch(failDelete);
  } else {
    const docRef = doc(db, section, id);
    return await deleteDoc(docRef).then(goodDelete).catch(failDelete);
  }
};
//-----------------------------------------

export const newSection = async ({ section, name, item }) => {
  const docRef = doc(db, section, name);
  return await setDoc(docRef, item).then(good).catch(fail);
};
//--------
function good() {
  alert("Articulo Agregado");
  return true;
}
function fail(error) {
  let errorMessage = error.message;
  alert(errorMessage);
  return false;
}
function goodDelete() {
  alert("Articulo Eliminado");
  return true;
}

function failDelete(error) {
  let errorMessage = error.message;
  console.log(errorMessage);
  alert("Opción Desabilidata para pruebas");
  return false;
}
