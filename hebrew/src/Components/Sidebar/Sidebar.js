import { Link } from "react-router-dom";
import "./Sidebar.css";
import logo from "./amazinglogo.png";
import { useEffect, useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import userlogo from "./userlogo.png";

const Sidebar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUsername("wassip");
    }
  });

  return (
    <>
      <div className="sidebar">
        <img src={logo} alt="logo"></img>
        <LoginModal
          show={showLogin}
          onClose={() => setShowLogin(false)}
        ></LoginModal>
        <h4>
          <button className="nav-button" onClick={() => setShowLogin(true)}>
            <img src={userlogo}></img>
            <br />
            {username}
          </button>
        </h4>
        <Link to="/">
          <button className="nav-button">Home</button>
        </Link>
        <h4>
          <Link to="/lessonslist">
            <button className="nav-button">Lessons List</button>
          </Link>
        </h4>
        <h4>
          <Link to="/wordslist">
            <button className="nav-button">Saved Words</button>
          </Link>
        </h4>
      </div>
    </>
  );
};

export default Sidebar;
