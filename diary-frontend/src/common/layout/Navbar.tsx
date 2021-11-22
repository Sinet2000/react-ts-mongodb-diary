import { Routes } from "../../app/routes";
import { Link } from "react-router-dom";
import { IUser } from "../types";

type Props = {
  currentUser: IUser | null;
  logOut: () => void;
}

export const Navbar = ({currentUser, logOut}: Props) => {
  return (
    <nav className="navbar is-dark">
      <div className="navbar-brand">
        <div className="navbar-item">
          <span className="icon is-small mx-2">
            <i className="fas fa-address-book"></i>
          </span>
          Personal Diary
        </div>
      </div>

      {currentUser ? (
        <div className="navbar-end">
          <Link to={Routes.Notes} className="navbar-item">
            <span className="icon is-small mr-2">
              <i className="fas fa-file-alt"></i>
            </span>
            {currentUser.username}'s notes
          </Link>

          <Link to={Routes.Home} className="navbar-item" onClick={logOut}>
            <span className="icon is-small mr-1">
              <i className="fas fa-sign-out-alt"></i>
            </span>
            Logout
          </Link>
        </div>

      ) : (

        <div className="navbar-end">
          <Link to={Routes.SignIn} className="navbar-item">
            <span className="icon is-small mr-2">
              <i className="fas fa-sign-in-alt"></i>
            </span>
            Login
          </Link>

          <Link to={Routes.SignUp} className="navbar-item">
            <span className="icon is-small mr-2">
              <i className="fas fa-user-plus"></i>
            </span>
            Register
          </Link>
        </div>
      )}

  </nav>
  );
};