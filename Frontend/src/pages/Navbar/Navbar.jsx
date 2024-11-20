import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import axios from "axios";
import baseurl from "../../assets/url";
import ListDonorRequest from "../../components/ListDonorRequest";

const eraseCookie = (name) => {
  document.cookie = name + "=; Max-Age=-99999999;";
};

const Navbar = () => {
  const { userRole, updateSetUserRole } = useContext(userContext);

  const [login, setLogin] = useState(userRole);
  const [notifications, setNotifications] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const logout = () => {
    eraseCookie("role");
    eraseCookie("token");
    updateSetUserRole(false);
    setNotifications(0);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (login) {
      (async () => {
        try {
          const res = await axios.get(baseurl + "/getreq", {
            withCredentials: true,
          });
          if (!res.data.status) throw new Error(res.data.msg);
          setNotifications(res.data.requests.reduce((acc, req) => req.status === "pending" ? acc + 1 : acc, 0));
        } catch (error) {
          console.log(error.message);
        }
      })();
    } else {
      setNotifications(0);
    }
  }, [login, userRole]);

  useEffect(() => {
    setLogin(userRole);
  }, [userRole]);

  return (
    <>
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
          {userRole !== "admin" && userRole !== "org" ? (
            <>
              <Link
                to={"/"}
                color="inherit"
                className="text-gray uppercase text-sm mx-2"
              >
                Home
              </Link>
              <Link
                to={"/about"}
                color="inherit"
                className="text-gray uppercase text-sm mx-2"
              >
                About
              </Link>
              <Link
                to={"/contactus"}
                color="inherit"
                className="text-gray uppercase text-sm mx-2"
              >
                Contact
              </Link>
            </>
          ) : (
            <Link
              to={"/dashboard"}
              color="inherit"
              className="text-gray uppercase text-sm mx-2"
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
              className="text-gray uppercase text-sm mx-2"
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
              className="text-gray uppercase text-sm mx-2"
            >
              <Button variant="contained" color="error" size="large">
                Login
              </Button>
            </Link>
          )}
          {login && (
            <Badge
              variant="standard"
              badgeContent={notifications}
              color={notifications > 0 ? "error" : "success"}
              onClick={handleOpenModal}
            >
              <AddAlertIcon color={notifications > 0 ? "error" : "success"} />
            </Badge>
          )}
        </Toolbar>
      </AppBar>
      <ListDonorRequest
        open={modalOpen}
        handleClose={handleCloseModal}
        // donorId="your-donor-id" // Replace with actual donor ID
      />
    </>
  );
};

export default Navbar;
