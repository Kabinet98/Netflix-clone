import { useState } from "react";
import "../Css/Login.css";
import SignIn from "./SignIn";
const Login = () => {
  const [signIn, setSignIn] = useState(false);
  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix logo"
        />
        <button onClick={() => setSignIn(true)} type="submit">
          Sign In
        </button>
      </div>
      {signIn ? (
        <SignIn />
      ) : (
        <div className="login__body">
          <h1 className="separate">Unlimited films, TV programs and more.</h1>
          <h2 className="separate">Watch anywhere. Cancel at anytime</h2>
          <p className="separate">
            Ready to watch?Enter your email to create or restart your membership
          </p>
          <div className="login__input">
            <input type="email" name="" id="" placeholder="Email address" />
            <button type="submit" onClick={() => setSignIn(true)}>
              Get Started
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Login;
