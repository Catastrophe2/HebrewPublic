import { useEffect, useState } from "react";
import "./LoginModal.css";
import { useForm } from "react-hook-form";
import LoginTemp from "../LoginTemp/LoginTemp";
import RegisterMod from "../RegisterMod/RegisterMod";

const LoginModal = (props) => {
  const [modeLogin, setModeLogin] = useState(true);
  const [formReplay, setFormReplay] = useState("");

  if (!props.show) {
    return null;
  }

  if (localStorage.getItem("token")) {
    return (
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h4>Profile</h4>
          </div>
          <div className="modal-body">
            <h3>Welcome back!</h3>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (modeLogin)
    return (
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h4>Login</h4>
            <span>{formReplay}</span>
          </div>
          <div className="modal-body">
            <LoginTemp setFormReplay={setFormReplay}></LoginTemp>
          </div>
          <div className="modal-footer">
            <button onClick={props.onClose}>Close</button>
            <a
              className="login-reg-but"
              onClick={() => {
                setModeLogin(false);
              }}
            >
              or register instead
            </a>
          </div>
        </div>
      </div>
    );
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4>Register</h4>
          <span>{formReplay}</span>
        </div>
        <div className="modal-body">
          <RegisterMod setFormReplay={setFormReplay}></RegisterMod>
        </div>
        <div className="modal-footer">
          <button onClick={props.onClose}>Close</button>
          <a
            className="login-reg-but"
            onClick={() => {
              setModeLogin(true);
            }}
          >
            Or login!
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
