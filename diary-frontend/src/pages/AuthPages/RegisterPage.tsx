import React, { useState } from "react";
import { Routes } from "../../app/routes"
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpInput, signUpSchema } from "../../api/schemas/signUpSchema";
import { signUp } from "../../api/authAPI";

const RegisterPage = () => {
  const history = useHistory();
  const [registerError, setRegisterError] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });
  
  async function onSubmit(values: SignUpInput) {
    try {
      await signUp(values);
      history.push(Routes.Home);
    } catch (e) {
      setRegisterError(e.message);
    }
  }

  return (
    <>
      <p>{registerError}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-element">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="jane.doe@example.com"
            {...register("email")}
          />
          <p>{errors.email?.message}</p>
        </div>

        <div className="form-element">
          <label htmlFor="username">Username</label>
          <input
            id="name"
            type="text"
            placeholder="Jane Doe"
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

        <div className="form-element">
          <label htmlFor="passwordConfirmation">Confirm password</label>
          <input
            id="passwordConfirmation"
            type="password"
            placeholder="*********"
            {...register("passwordConfirmation")}
          />
          <p>{errors.passwordConfirmation?.message}</p>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default RegisterPage;