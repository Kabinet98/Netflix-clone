import "../Css/SignIn.css";
import { useRef } from "react";
import { auth } from "../Firebase";

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const signin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authuser) => {
        console.log(authuser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authuser) => {
        console.log(authuser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="signin">
      <form>
        <h2>Sign In</h2>
        <input type="email" name="" id="email" placeholder="Email" ref={emailRef} />
        <input
          type="password"
          name=""
          id="password"
          placeholder="Password"
          ref={passwordRef}
        />
        <button type="submit" onClick={signin}>
          Sign In
        </button>
        <h4 style={{ marginTop: "8px", textAlign: "left" }}>
          <span style={{ color: "gray" }}>New to Netflix? </span>
          <span className="signup" onClick={register}>
            Sign Up
          </span>
        </h4>
      </form>
    </div>
  );
};
export default SignIn;
