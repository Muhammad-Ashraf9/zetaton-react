import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { USER_COLLECTION, db } from "../../config/firebase";

export const fetchFavourites = async (userId) => {
  try {
    // get the user document
    const userRef = await doc(db, USER_COLLECTION, userId);

    const userSnap = await getDoc(userRef);

    // if user does not exist, create it with an empty favourites array
    if (!userSnap.exists()) {
      await setDoc(userRef, { favourites: [] });
      return [];
    }

    const userData = userSnap.data();

    return userData.favourites || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addFavourite = async (userId, photo) => {
  try {
    const userRef = await doc(db, USER_COLLECTION, userId);
    const userSnap = await getDoc(userRef);

    // if user does not exist, create it with an empty favourites array
    if (!userSnap.exists()) {
      await setDoc(userRef, { favourites: [] });
    }

    // update the user document with the new favourite photo
    await updateDoc(userRef, {
      favourites: arrayUnion(photo),
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeFavourite = async (userId, photo) => {
  try {
    const userRef = await doc(db, USER_COLLECTION, userId);
    const userSnap = await getDoc(userRef);

    // if user does not exist, create it with an empty favourites array
    if (!userSnap.exists()) {
      await setDoc(userRef, { favourites: [] });
      return;
    }

    // update the user document by removing the photo from the favourites array
    await updateDoc(userRef, {
      favourites: arrayRemove(photo),
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
