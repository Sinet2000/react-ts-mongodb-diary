import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSignUpSchema, SignUpInput } from "../api/schemas/signUpSchema";
import { authAPI } from "../api";
import { useHistory } from "react-router-dom";

const RegisterPage = () => {
  const history = useHistory();
  const [registerError, setRegisterError] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpInput>({
    resolver: zodResolver(createSignUpSchema)
  });

  async function onSubmit(values: SignUpInput) {
    try {
      await authAPI.signUp(values);
      history.push("/")
    } catch (e: any) {
      setRegisterError(e.message);
    }
  }

  return (
    <div className="columns is-mobile is-centered">
      <div className="card column is-one-quarter mt-6 has-background-primary-light">
        <div className="card-header has-background-primary-dark">
          <h2 className="card-header-title has-text-white">Register for your account.</h2>
        </div>
        <div className="card-content">
            <div className={ registerError ? "" : "is-hidden"}>
              <div className="notification is-danger is-light">
                {registerError}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="field">
                <label className="label">Username</label>
                <div className="control has-icons-left">
                  <input
                    className="input"
                    id="name"
                    type="text"
                    placeholder="Jane Doe"
                    {...register("username")}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
                <p>{errors.username?.message}</p>
              </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left">
                  <input
                    className="input"
                    id="email"
                    type="email"
                    placeholder="jane.doe@example.com"
                    {...register("email")}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </div>
                <p>{errors.email?.message}</p>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control has-icons-left">
                  <input
                    className="input"
                    id="password"
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
                <label className="label">Confirm Password</label>
                <div className="control has-icons-left">
                  <input
                    id="passwordConfirmation"
                    className="input"
                    type="password"
                    placeholder="Password"
                    {...register("passwordConfirmation")}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </div>
                <p>{errors.passwordConfirmation?.message}</p>
              </div>

              <div className="field">
                <div className="control">
                  <button className="button is-fullwidth is-primary">
                    Register
                  </button>
                </div>
              </div>
            </form>

        </div>
      </div>
    </div>
  );
}

export default RegisterPage;