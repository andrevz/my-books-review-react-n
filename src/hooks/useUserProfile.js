import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export function useUserProfile() {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const subscriber = onSnapshot(doc(db, 'profiles', auth.currentUser.uid), (docSnap) => {
      if (docSnap.exists())
        setUserProfile(docSnap.data());
    });

    return subscriber;
  }, []);

  return {
    userProfile
  };
}