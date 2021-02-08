import "../Css/Nav.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
const Nav = () => {
  const history = useHistory();
  const [handle, handleShow] = useState(false);
  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else handleShow(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);
  return (
    <div className="nav">
      <div className={`nav__contents ${handle && "nav__black"}`}>
        <img
          onClick={() => history.push("/")}
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="nav content"
          className="nav__logo"
          style={{
            cursor: "pointer",
          }}
        />
        <img
          onClick={() => history.push("/profile")}
          src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
          alt=""
          className="nav__avatar"
        />
      </div>
    </div>
  );
};
export default Nav;
