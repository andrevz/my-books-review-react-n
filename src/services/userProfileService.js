import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export async function getUserProfile() {
  let userProfile = null;

  try {
    const docSnap = await getDoc(doc(db, 'profiles', auth.currentUser.uid));
    if (docSnap.exists())
      userProfile = docSnap.data();
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't retrieve user profile, please try again later");
  }

  return userProfile;
}

export async function updateUserProfile(data) {
  try {
    await setDoc(doc(db, 'profiles', auth.currentUser.uid), data);
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't update user profile, please try again later");
  }
}