import React, { useState, useEffect } from "react";
// import GoogleButton from "react-google-button";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAuth, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { AiFillFacebook } from "react-icons/ai";

import {
  GoogleLoginButton,
  FacebookLoginButton,
  TwitterLoginButton,
} from "react-social-login-buttons";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { googleSignIn, user, signIn } = useAuth();
  console.log("userrrr", user);
  const handleGoogleSignIn = () => {
    try {
      googleSignIn();
      // navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
      throw e;
    }
  };

  //handleFacebookSignIn

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    provider.addScope("user_birthday");
    provider.setCustomParameters({
      display: "popup",
    });

    const auth = getAuth();
    console.log("auth", auth);
    await signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log("facebook user", user);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        console.log("credential", credential);
        const accessToken = credential.accessToken;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        console.log("facebook error", error);
      });
  };

  useEffect(() => {
    if (user !== null) {
      navigate("/account");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);

      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div>
      <div className="max-w-[400px] mx-auto min-h-[600px] px-4 py-20">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label>Email</label>
            <div className="my-2 w-full relative rounded-2xl shadow-xl">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-primary border border-input rounded-2xl"
                type="email"
              />
              <AiOutlineMail className="absolute right-2 top-3 text-gray-400" />
            </div>
          </div>
          <div className="my-4">
            <label>Password</label>
            <div className="my-2 w-full relative rounded-2xl shadow-xl">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-primary border border-input rounded-2xl"
                type="password"
              />

              <AiFillLock className="absolute right-2 top-3 text-gray-400" />
            </div>
          </div>
          <button className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl">
            Sign in
          </button>
        </form>
        <p className="my-4">
          Don't have an account?{" "}
          <Link to="/signup" className=" text-accent">
            Sign up
          </Link>
        </p>
        <div>
          <GoogleLoginButton onClick={handleGoogleSignIn} />
        </div>
        <div>
          <FacebookLoginButton onClick={handleFacebookSignIn} />
        </div>
        <div>
          <TwitterLoginButton onClick={() => alert("Hello, I am waiting")} />
        </div>
      </div>
    </div>
  );
};

export default Signin;
