import React, { useState } from "react";
import { Routes } from "../../app/routes"
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInInput, signInSchema } from "../../api/schemas/signInSchema";
import { signIn } from "../../api/authAPI";

const LoginPage = () => {
  const history = useHistory();
  const [loginError, setLoginError] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
  });
  
  async function onSubmit(values: SignInInput) {
    try{
      await signIn(values);
      history.push(Routes.Home);
    } catch(e){
      setLoginError(e.message);
    }
  }

  return (
    <>
      <p>{loginError}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-element">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="test123"
            {...register("username")}
          />
          <p>{errors.username?.message}</p>
        </div>

        <div className="form-element">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="*********"
            {...register("password")}
          />
          <p>{errors.password?.message}</p>
        </div>

        <button type="submit">Sign In</button>
      </form>
    </>
  );
}

export default LoginPage;