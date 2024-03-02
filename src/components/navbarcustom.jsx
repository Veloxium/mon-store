import React from "react";
import { Link } from "react-router-dom";
import { useDataContex } from "../utils/datacontext";

function NavbarCustom() {
  const { isPlaying, togglePlayback } = useDataContex();
  return (
    <nav className="flex-col flex my-2 lg:flex-row items-center lg:gap-4 justify-center">
      <div className="flex justify-center gap-4">
        <div className="home inline-flex">
          <Link to={"/"}>
            <p className="option px-2 py-1 text-white poppins text-sm lg:text-md uppercase">
              Home
            </p>
          </Link>
        </div>
        <div className="collection inline-flex">
          <Link to={"#"}>
            <p className="option px-2 py-1 text-white poppins text-sm lg:text-md uppercase">
              Collection
            </p>
          </Link>
        </div>
        <div className="about inline-flex">
          <Link to={"#"}>
            <p className="option px-2 py-1 text-white poppins text-sm lg:text-md uppercase">
              Contact
            </p>
          </Link>
        </div>
      </div>
      <div className="search flex justify-center gap-2 mt-4 lg:mt-0">
        <div className="about inline-flex">
          <Link to={"#"}>
            <p className="option px-2 py-1 text-white poppins text-sm lg:text-md uppercase">
              More Information
            </p>
          </Link>
        </div>
      </div>
      <div className="search flex justify-center gap-2 mt-4 lg:mt-0">
        <Link to={"#"}>
          <div className="cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </Link>
        <Link to={"/cart"}>
          <div className="cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              className="bi bi-cart3 w-7 h-7"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
          </div>
        </Link>
        <div className="cart cursor-pointer">
          <div onClick={togglePlayback}>
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarCustom;
