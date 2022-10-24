import React, { useRef } from "react";
import Logo from "../assets/logo2.png";
import { useNavigate } from "react-router-dom";
import { getLoginInfo } from "../utils/LoginInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

const NavBar = () => {
  let navigate = useNavigate();
  const role = getLoginInfo()?.role;
  const name = getLoginInfo()?.firstName;

  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 cursor-pointer">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a onClick={() => navigate("/active")} className="flex items-center">
          Pending
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a onClick={() => navigate("/completed")} className="flex items-center">
          Done
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a
          onClick={() => navigate("/users")}
          style={{ display: role != "ADMIN" ? "none" : "" }}
          className="flex items-center"
        >
          Users
        </a>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="mx-auto py-2 px-2 lg:px-8 lg:py-1 bg-black border-none rounded-none shadow-lg">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 cursor-pointer">
          <img
            onClick={() => navigate("/active")}
            className="h-8 w-8 cursor-pointer hidden lg:inline"
            src={Logo}
          ></img>

          <Typography
            as="a"
            onClick={() => navigate("/active")}
            variant="small"
            className="mr-4 cursor-pointer py-1.5 font-normal font-bold"
          >
            <span>Brightly Todo</span>
          </Typography>
        </ul>
        <div className="hidden lg:block">{navList}</div>

        <a className="hidden lg:inline-block cursor-pointer block text-md px-2 py-2 text-yellow-400 rounded ml-2 font-bold hover:text-white mt-4  lg:mt-0">
          <FontAwesomeIcon icon={faUser} className="text-white mr-2 h-5 w-5" />
          <span className="text-white">{name}</span>{" "}
          <FontAwesomeIcon
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="ml-4 h-5 w-5"
            icon={faRightFromBracket}
          />
        </a>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        {navList}
        <FontAwesomeIcon icon={faUser} className="text-white mr-2 h-5 w-5" />
          <span className="text-white">{name}</span>{" "}
        <FontAwesomeIcon
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="cursor-pointer  text-md  text-yellow-400 rounded ml-2 font-bold hover:text-white h-5 w-5"
          icon={faRightFromBracket}
        />
      </MobileNav>
    </Navbar>
  );
};

export default NavBar;
