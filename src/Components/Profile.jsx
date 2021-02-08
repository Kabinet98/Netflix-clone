import "../Css/Profile.css";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import { userSelector } from "./UserSlice";
import { auth } from "../Firebase";
import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import { useState } from "react";
import Plans from "./Plans";

const Profile = () => {
  const [checked, setChecked] = useState(false);
  const [disable, setDisable] = useState(true);
  const edit = (e) => {
    e.preventDefault();
    setChecked(true);
    setDisable(false);
  };
  const save = (e) => {
    e.preventDefault();
    setDisable(true);
    setChecked(false);
    auth
      .onAuthStateChanged((authuser) => {
        if (authuser) {
          authuser.updateEmail(editEmail);
        }
      })
      .catch((error) => {
        alert(error.message("Signout to update "));
      });
  };

  const history = useHistory();
  const signOut = () => {
    auth.signOut();
    history.push("/");
  };
  const email = useSelector(userSelector).email;
  const [editEmail, setEditEmail] = useState(email);

  return (
    <div className="profile">
      <div className="profile__nav">
        <Nav />
      </div>
      <div className="profile__body">
        <h1>Edit Profile</h1>
        <div className="profile__info">
          <div className="profile__image">
            <img
              src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
              alt="logo"
            />
          </div>
          <div className="profile__details">
            <div className="profile__emailEdit">
              <input
                type="email"
                name="email"
                id="email"
                value={editEmail}
                disabled={disable}
                onChange={(e) => setEditEmail(e.target.value)}
              />
              {!checked ? (
                <IconButton onClick={edit} type="submit">
                  <EditIcon color="primary" />
                </IconButton>
              ) : (
                <IconButton>
                  <CheckIcon color="primary" onClick={save} type="submit" />
                </IconButton>
              )}
            </div>
            <div className="profile__plans">
              <h3>Plans</h3>
              <Plans />
              <button className="profile__signOut" onClick={signOut}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
