import { useEffect, useState } from "react";
import "./LoginModal.css";
import { useForm } from "react-hook-form";

const LoginModal = (props) => {
  const [modeLogin, setModeLogin] = useState(true);
  const { loginH2, handleSubmit, errors } = useForm();

  if (!props.show) {
    return null;
  }

  const onSubmit = (data) => {
    console.log(data);
  };

  if (modeLogin)
    return (
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h4>Login</h4>
            <button
              className="login-reg-but"
              onClick={() => {
                setModeLogin(false);
              }}
            >
              Register
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label for="email">Email</label>
              <input type="text" id="email" ref={loginH2}></input>
              <br />
              <label for="password">Password</label>
              <input type="password" id="password" ref={loginH2}></input> <br />
              <button onClick={loginH2}>Submit</button>
            </form>
          </div>
          <div className="modal-footer">
            <button onClick={props.onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4>Register</h4>
          <button
            className="login-reg-but"
            onClick={() => {
              setModeLogin(true);
            }}
          >
            Login
          </button>{" "}
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label for="email">Email</label>
            <input type="text" id="email" ref={loginH2}></input>
            <br />
            <label for="password">Password</label>
            <input type="password" id="password" ref={loginH2}></input> <br />
            <button onClick={loginH2}>Submit</button>
          </form>
        </div>
        <div className="modal-footer">
          <button onClick={props.onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
