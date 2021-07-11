import { useForm } from "react-hook-form";

const LoginTemp = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let usernameData = data.email;
    let passwordData = data.password;
    const result = await fetch("http://localhost:8000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usernameData,
        passwordData,
      }),
    }).then((res) => res.json());
    if (result.status === "error") props.setFormReplay(result.data);
    if (result.status === "ok") {
      props.setFormReplay("login succesfuly");
      localStorage.setItem("token", result.data);
      window.location.reload();
    }
  };

  return (
    <div>
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
      </form>
    </div>
  );
};

export default LoginTemp;
