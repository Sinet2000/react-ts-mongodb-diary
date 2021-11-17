import { Routes } from "../../app/routes";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = User.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  
  return (
    <div>
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
              <Link to={`/${currentUser.username}/notes`} className="navbar-item">
                <span className="icon is-small mr-2">
                  <i className="fas fa-file-alt"></i>
                </span>
                {currentUser.username}'s notes
              </Link>

              <Link to="/" className="navbar-item" onClick={logOut}>
                <span className="icon is-small mr-1">
                  <i className="fas fa-sign-out-alt"></i>
                </span>
                Logout
              </Link>
            </div>

          ) : (

            <div className="navbar-end">
              <Link to="/login" className="navbar-item">
                <span className="icon is-small mr-2">
                  <i className="fas fa-sign-in-alt"></i>
                </span>
                Login
              </Link>

              <Link to="/register" className="navbar-item">
                <span className="icon is-small mr-2">
                  <i className="fas fa-user-plus"></i>
                </span>
                Register
              </Link>
            </div>
          )}

        </nav>
      </div>
  );
};