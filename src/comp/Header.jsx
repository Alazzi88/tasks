
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import "../theme.css";
import "../index.css";
// LEVEL2
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// lange
import { useTranslation } from 'react-i18next';

const Header = () => {

  const { t, i18n } = useTranslation();
  const [user, ] = useAuthState(auth);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <div className="myheader">
      <header className="hide-when-mobile ezzo ">
        <div className="logo-details">
          <img className="imglogo" src="https://3zzo.com/img/logo.png" alt="" />
          <h1>
            <Link to="/">ezzo</Link>
          </h1>
        </div>

        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-moon"
        ></i>
        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-sun"
        ></i>

        {/* mobile  */}
        <input type="checkbox" id="menu" />
        <label htmlFor="menu"><i className="fa-solid fa-bars"></i></label>



        <ul className="flex dropdown_menu">
          <li className="main-list lang">
          {t("lang")}

            <ul className="lang-box">
              <li onClick={() => {
                i18n.changeLanguage ("ar")
              }
              } style={{ justifyContent: "space-between"}} dir="rtl">
                <p>العربية</p>
                {i18n.language==="ar" && (<i className="fa-solid fa-check"></i>)}
              </li>
              <li    onClick={() => {
                i18n.changeLanguage ("en")
              }
              }  style={{ justifyContent: "space-between"}}>
                <p>English</p> 
                {i18n.language==="en" && (<i className="fa-solid fa-check"></i>)}
              </li>
            </ul>
          </li>

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/Signin">
              {t("signin")}
              </NavLink>
            </li>
          )}

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/Signup">
              {t("signup")}
              </NavLink>
            </li>
          )}

          {user && (
            <li
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    navigate("/signin");
                  })
                  .catch((error) => {
                    // An error happened.
                  });
              }}
              className="main-list"
            >
              <a className="main-link signout">

              {t("signout")}
                
                </a>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/about">
              {t("support")}
              </NavLink>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/profile">
              {t("account")}
              </NavLink>
            </li>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Header;
