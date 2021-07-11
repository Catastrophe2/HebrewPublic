import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import "./Home.css";
import { useForm } from "react-hook-form";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    let emailData = data.email;
    let passData = data.password;
    const result = await fetch("http://localhost:8000/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailData,
        passData,
      }),
    }).then((res) => res.json());
    if (result.status !== "ok") alert(result.error);
  };

  return (
    <div className="overall-cont">
      <LoginModal
        show={showLogin}
        onClose={() => setShowLogin(false)}
      ></LoginModal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label for="email">Email</label>
        <input
          type="text"
          id="email"
          {...register("email", { required: true })}
        ></input>
        {errors.email && <span>Email is required.</span>}
        <br />
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
        ></input>{" "}
        <br />
        <button>Submit</button>
        <button>Register</button>
      </form>
    </div>
  );
};

export default Home;
