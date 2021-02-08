import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeScreen from "./Components/HomeScreen";
import Login from "./Components/Login";
import { auth } from "./Firebase";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, userSelector } from "./Components/UserSlice";
import Profile from "./Components/Profile";
function App() {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        dispatch(
          login({
            uid: authuser.uid,
            email: authuser.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  return (
    <Router>
      <div className="App">
        {!user ? (
          <Login />
        ) : (
          <Switch>
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/" component={HomeScreen} />
            <HomeScreen />
          </Switch>
        )}
      </div>
    </Router>
  );
}

export default App;
