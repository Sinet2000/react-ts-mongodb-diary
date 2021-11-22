import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInput, createLoginSchema } from "../api/schemas/loginSchema";
import { authAPI } from "../api";

const LoginPage = () => {
  const history = useHistory();
  const [loginError, setLoginError] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInput>({
    resolver: zodResolver(createLoginSchema),
  });
  
  async function onSubmit(values: SignInput) {
    try{
      await authAPI.signIn(values);
      history.push('/');
    } catch(e: any){
      setLoginError(e.message);
    }
  }

  return (
    <div className="columns is-mobile is-centered">
      <div className="card column is-one-quarter mt-6 has-background-primary-light">
        <div className="card-header has-background-primary-dark">
          <h2 className="card-header-title has-text-white">Log in to your personal diary.</h2>
        </div>
        <div className="card-content">

          <form onSubmit={handleSubmit(onSubmit)}>
            {loginError && (
              <div className="notification is-danger is-light">
                {loginError}
              </div>
            )}

            <div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  id="username"
                  type="text"
                  placeholder="Username"
                  {...register("username")}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
              <p>{errors.username?.message}</p>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  placeholder="*********"
                  {...register("password")}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
              <p>{errors.password?.message}</p>
            </div>

            <div className="field">
              <div className="control">
                <button className="button is-fullwidth is-primary">
                  Login
                </button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;