import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export async function registerUser(email, password) {
  if (!email || !password)
    throw new Error("Email and password are required");

  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    throw new Error("User registration failed, email could be already in use");
  }
}

export async function signIn(email, password) {
  if (!email || !password)
    throw new Error("Email and password are required");

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    throw new Error("Check your credentials or try again later");
  }
}

export async function signOutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    throw new Error("Couldn't sign out user");
  }
}