import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import Dashboard from "../Dashboard/Dashboard";

// Get the value of a cookie by its name
// const getCookie = (name) => {
//   const nameEQ = name + "=";
//   const ca = document.cookie.split(';');
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) === ' ') c = c.substring(1, c.length);
//     if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
//   }
//   return null;
// };

// const setCookie = (name, value) => {
//   let expires = "";
//     expires = "; expires="+172800000;
//   document.cookie = name + "=" + (value || "false") + expires + "; path=/";
// };

// Usage example
// console.log('Cookie value:', isLogin); // Output: 'JohnDoe'

const eraseCookie = (name) => {
  document.cookie = name + "=; Max-Age=-99999999;";
};

const Navbar = () => {
  const { userRole, updateSetUserRole } = useContext(userContext);

  const [login, setLogin] = useState(userRole);
  const logout = () => {
    eraseCookie("role");
    updateSetUserRole(false);
    document.cookie = "";
  };

  useEffect(() => {
    setLogin(userRole);
  }, [userRole]);

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Typography
          variant="h6"
          className="flex-grow hover:cursor-pointer select-none"
        >
          <Link to={"/"} color="inherit">
            <span className="text-red-600 font-semibold">Red</span>
            <span>Gold</span>
          </Link>
        </Typography>
        {userRole !== "admin" && userRole !==  "org" ? (
          <>
            <Link
              to={"/"}
              color="inherit"
              className="text-gray uppercase text-sm mx-2 "
            >
              Home
            </Link>
            <Link
              to={"/about"}
              color="inherit"
              className="text-gray uppercase text-sm mx-2 "
            >
              About
            </Link>
            <Link color="inherit" className="text-gray uppercase text-sm">
              Services
            </Link>
            <Link
              to={"/contactus"}
              color="inherit"
              className="text-gray uppercase text-sm mx-2 "
            >
              Contact
            </Link>
          </>
        ) : (
          <Link
            to={"/dashboard"}
            color="inherit"
            className="text-gray uppercase text-sm mx-2 "
          >
            <Button variant="contained" color="primary" size="large">
              DashBoard
            </Button>                                                  
          </Link>
        )}
        {login ? (
          <Link
            to={"/login"}
            color="inherit"
            className="text-gray uppercase text-sm mx-2 "
          >
            <Button
              onClick={logout}
              variant="contained"
              color="primary"
              size="large"
            >
              Logout
            </Button>
          </Link>
        ) : (
          <Link
            to={"/login"}
            color="inherit"
            className="text-gray uppercase text-sm mx-2 "
          >
            <Button variant="contained" color="primary" size="large">
              Login
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
