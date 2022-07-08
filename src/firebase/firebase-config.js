import { initializeApp } from "firebase/app";
import { SECTIONS } from "./../constantes";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { getFirestore, collection, getDocs } from "firebase/firestore";

//-----------------------------

const firebaseConfig = {
  apiKey: "AIzaSyCPj8EmFv-S2Dck1GAPJ8_bN3BzzWUkFSw",
  authDomain: "canvas-dibujo.firebaseapp.com",
  projectId: "canvas-dibujo",
  storageBucket: "canvas-dibujo.appspot.com",
  messagingSenderId: "977007089483",
  appId: "1:977007089483:web:dc382ebee606eb111ebace",
  measurementId: "G-8HZCMLTS45",
};

// Initialize Firebase and DataBase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth();

//--function que obtiene toda la informacon de la pagina--------------------------

export async function getTotalData() {
  let triedArreglos = 0;
  let triedComplementos = 0;
  let triedReseñas = 0;
  let triedRecomendados = 0;

  let Recomendados = {};
  let Arreglos = {};
  let Complementos = {};
  let Reseñas = {};

  //---------------------------------
  async function getRecommended() {
    const querySnapshot = await getDocs(collection(db, SECTIONS.recomendados));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      Recomendados[id] = data;
    });
  }
  //---------------------------------
  async function getArreglos() {
    const querySnapshot1 = await getDocs(collection(db, SECTIONS.arreglos));
    querySnapshot1.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      Arreglos[id] = data;
    });
  }

  //------------------------------------
  async function getComplementos() {
    const querySnapshot2 = await getDocs(collection(db, SECTIONS.complementos));
    querySnapshot2.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      Complementos[id] = data;
    });
  }

  //---------------------------------
  async function getReseñas() {
    const querySnapshot3 = await getDocs(collection(db, SECTIONS.reseñas));
    querySnapshot3.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      Reseñas[id] = data;
    });
  }

  //----si hay un error al obtener la info vuelve a intentarlo hasta un maximo de 3 veces-------------------------
  while (Object.keys(Recomendados).length === 0 && triedRecomendados < 3) {
    triedRecomendados += 1;
    await getRecommended();
  }
  while (Object.keys(Arreglos).length === 0 && triedArreglos < 3) {
    triedArreglos += 1;
    await getArreglos();
  }
  while (Object.keys(Complementos).length === 0 && triedComplementos < 3) {
    triedComplementos += 1;
    await getComplementos();
  }
  while (Object.keys(Reseñas).length === 0 && triedReseñas < 3) {
    triedReseñas += 1;
    await getReseñas();
  }
  //-----------------------------
  if (
    Object.keys(Recomendados).length !== 0 &&
    Object.keys(Reseñas).length !== 0 &&
    Object.keys(Arreglos).length !== 0 &&
    Object.keys(Complementos).length !== 0
  ) {
    return { Recomendados, Arreglos, Complementos, Reseñas };
  } else {
    return false;
  }
}

//-----Iniciar Session----------------------
export function signInWithEmailAndPasswords(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      return true;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      alert(errorMessage);
      return null;
    });
}
//-----Comprobar Session Activa----------------------
export async function onAuthStateChangeds(onChange) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      onChange(true);
    } else {
      onChange(true); //true for test
    }
  });
}
//-----Log Out----------------------
export function signOuts() {
  return signOut(auth);
}
