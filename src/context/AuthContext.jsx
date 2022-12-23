import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

const UserContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const googleSignIn = async (email) => {
    const provider = new GoogleAuthProvider();
    // setDoc(doc(db, "users", email), {
    //   readList: [],
    // });
    await signInWithRedirect(auth, provider);
  };

  const signUp = (email, password) => {
    console.log("signUp");
    createUserWithEmailAndPassword(auth, email, password);
    return setDoc(doc(db, "users", email), {
      readList: [],
    });
  };

  const signIn = async (email, password) => {
    const results = await signInWithEmailAndPassword(auth, email, password);
    // signInWithEmailAndPassword(auth, email, password);
    setUser(results.user);
    // console.log(results);
    return results;
  };

  const logout = async () => {
    await signOut(auth);
    setUser({});
  };

  useEffect(() => {
    const unsubsrcibe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
    });
    return unsubsrcibe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        googleSignIn,
        user,
        signUp,
        signIn,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(UserContext);
};

export default AuthContextProvider;
