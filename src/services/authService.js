import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export async function signIn(email, password) {
  if (!email || !password)
    throw new Error("Email and password are required");

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    throw new Error("Check your credentials or try again latter");
  }
}