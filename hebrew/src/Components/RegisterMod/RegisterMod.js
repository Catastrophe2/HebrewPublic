import { useForm } from "react-hook-form";

const RegisterMod = () => {
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
        <label for="passwordRe">Password again</label>
        <input type="password" id="passwordRe"></input>
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default RegisterMod;
