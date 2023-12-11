import React, { useState, useEffect, useCallback } from "react";
import Stars from "./stars";
import axios from "axios";
import Load from "../assets/load.png";
import { Link } from "react-router-dom";
import { useDataContex } from "../utils/datacontext";
import Loader from "./loader";

function CardPokemon({ name, url, id, pixel, notifHandle }) {
  const [dataPokemon, setDataPokemon] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [randomNum, setRandomNum] = useState(null);
  const [randomStar, setRandomStar] = useState(null);
  const [otherDataPokemon, setOtherDataPokemon] = useState([]);
  const { addToCart } = useDataContex();

  const fetchData = useCallback(async () => {
    try {
      setImageLoaded(false);
      const response = await axios.get(url);
      const results = response.data.sprites;
      const others = response.data.sprites.other["official-artwork"];

      setDataPokemon(results);
      setOtherDataPokemon(others);

      setImageLoaded(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [url]);

  useEffect(() => {
    fetchData();

    // Generate the random number when the component mounts
    const newRandomNum = generateRandomNumber();
    const newRandomStar = generateRandomStar();
    setRandomNum(newRandomNum);
    setRandomStar(newRandomStar);
  }, [fetchData]);

  const generateRandomNumber = () => {
    const random = Math.random();
    const randomNumInRange = 76.0 + random * (99.99 - 76.0);
    return randomNumInRange.toFixed(2);
  };

  const generateRandomStar = () => {
    const random = Math.random();
    const randomNumInRange = 1 + random * (5 - 1);
    return randomNumInRange.toFixed(0);
  };

  const handleAddToCart = () => {
    const newItem = {
      id: id,
      url: dataPokemon?.front_default,
      name: name,
      price: randomNum,
      star: randomStar,
    };
    addToCart(newItem);
    notifHandle();
  };

  return (
    <div className="card border relative">
      <Link
        to={`/pokemon/${id}/detail`}
        state={{ price: randomNum, star: randomStar }}
        className="flex flex-col p-2 lg:p-4 rounded-md z-0"
      >
        <div className="cardbg relative flex items-center justify-center p-4 w-full">
          <img
            src="/src/assets/topline.png"
            alt="linetop"
            className="absolute right-0 top-0 lg:w-20 w-10"
          />
          {imageLoaded ? (
            <img
              src={
                pixel
                  ? dataPokemon?.front_default
                  : otherDataPokemon?.front_default
              }
              loading="lazy"
              alt={name}
              className="flex w-full justify-center items-center object-cover"
            />
          ) : (
            <Loader />
          )}
          <img
            src="/src/assets/bottomline.png"
            alt="linetop"
            className="absolute left-0 bottom-0 lg:w-20 w-10"
          />
        </div>
        <div className="text-white poppins flex flex-col justify-start items-start mt-2">
          <p
            className={`font-bold text-md lg:text-xl uppercase ${
              imageLoaded ? "" : "hidden"
            }`}
          >
            {name}
          </p>
          <p
            className={`font-bold text-lg lg:text-xl uppercase ${
              imageLoaded ? "hidden" : ""
            }`}
          >
            Loading...
          </p>
          <div className="flex justify-center">
            {imageLoaded ? (
              <Stars count={randomStar} />
            ) : (
              <p className="font-bold text-sm lg:text-lg uppercase">-</p>
            )}
          </div>
          <div className="flex w-full items-center">
            {imageLoaded ? (
              <p className="text-sm mt-2">${randomNum}</p>
            ) : (
              <p className="font-bold text-xs lg:text-md uppercase">-</p>
            )}
          </div>
        </div>
      </Link>
      <button
        onClick={handleAddToCart}
        className="absolute bottom-3 right-3 lg:bottom-4 lg:right-4 z-30"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="white"
          className="w-6 h-6 lg:w-8 lg:h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  );
}

export default CardPokemon;
