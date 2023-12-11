import React from "react";
import Logo from "../assets/mainlogo.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const intro = ["Welcome", "To", "Monstore"];

function Homepage() {
  const randomPokemon = Math.floor(Math.random() * 1000) + 1;

  return (
    <div className="primary h-screen w-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          src={Logo}
          alt="logo"
          srcSet=""
          className="w-[50%] lg:w-[80%]"
        />
        <div className="flex gap-2 overflow-hidden h-12">
          {intro.map((text, i) => (
            <motion.p
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.3 + 1.7 }}
              key={i}
              className="text-white text-lg mt-4 poppins lg:text-2xl"
            >
              {text}
            </motion.p>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0 }}
          className="flex"
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemon}.png`}
            alt="pokemon"
            className="lg:w-[200px]"
          />
          {/* <p className="lets">{randomPokemon}</p> */}
        </motion.div>
        <div className="overflow-hidden h-10 mt-2">
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 3.0 }}
          >
            <Link to={"/pokemon/1"} className="lets flex items-center gap-1">
              <p className="lg:text-xl">Lets Go Hunt</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 lg:w-7 lg:h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
