import { getStorage } from "firebase/storage";
import { db } from "./firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const storage = getStorage();

//------Images--------------

export const getUploadTask = (file) => {
  const storageRef = ref(storage, `imagenes/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return uploadTask;
};

export const getImageURL = (uploadTaskRef) => {
  return getDownloadURL(ref((storage, uploadTaskRef)));
};
