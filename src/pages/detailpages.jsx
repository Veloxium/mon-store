import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Logo from "../assets/mainlogo.png";
import Load from "../assets/load.png";
import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Stars from "../components/stars";
import BottomNavDetail from "../components/bottomnavdetail";
import { motion, AnimatePresence } from "framer-motion";
import Notification from "../components/notification";
import Loader from "../components/loader";
import NavbarCustom from "../components/navbarcustom";

function DetailPages() {
  const { id } = useParams();
  const [dataPokemon, setDataPokemon] = useState([]);
  const [statsPokemon, setStatsPokemon] = useState([]);
  const [typesPokemon, setTypesPokemon] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isNotif, setIsNotif] = useState(false);
  const location = useLocation();
  const price = location.state.price;
  const star = location.state.star;

  const fetchData = useCallback(async () => {
    try {
      setImageLoaded(false);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const results = response.data;
      const stat = response.data.stats;
      const type = response.data.types;
      setDataPokemon(results);
      setStatsPokemon(stat);
      setTypesPokemon(type);
      setImageLoaded(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const notifHandle = () => {
    setIsNotif(true);
    setTimeout(function () {
      setIsNotif(false);
    }, 1000);
  };

  return (
    <div className="primary min-h-screen">
      <AnimatePresence>{isNotif && <Notification />}</AnimatePresence>
      <div className="title flex justify-center items-center pb-4 pt-10 gap-2">
        <img
          src={Logo}
          alt="title"
          srcSet=""
          className="w-[40%] lg:w-[10%] mt-[-14px]"
        />
      </div>
      <NavbarCustom />
      <div className="px-6 md:px-[120px]">
        <div className="flex justify-between mt-6">
          <p className="poppins font-bold text-2xl text-white uppercase">
            {imageLoaded ? dataPokemon?.name || "-" : "-"}
          </p>
          <p className="poppins font-bold text-2xl text-white uppercase custom px-2 rounded-lg">
            {id}
          </p>
        </div>
        <p className="text-white text-xl poppins mb-4">
          ${imageLoaded ? price || "-" : "-"}
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:px-[120px] md:gap-10 my-4">
        <section className="w-full">
          <div className="px-6 md:px-0">
            <div className="carddetail relative flex items-center justify-center p-10 w-full">
              <img
                src="/src/assets/topline.png"
                alt="linetop"
                className="absolute right-0 top-0 lg:w-20 w-24"
              />
              {imageLoaded ? (
                <img
                  src={
                    dataPokemon?.sprites?.versions?.["generation-v"][
                      "black-white"
                    ].animated?.front_default
                  }
                  alt={""}
                  className="flex w-full h-[200px] md:h-[300px] object-contain justify-center items-center"
                />
              ) : (
                <Loader bigLoad={true} />
              )}

              <img
                src="/src/assets/bottomline.png"
                alt="linetop"
                className="absolute left-0 bottom-0 lg:w-20 w-24"
              />
            </div>
          </div>
          <div className="mx-6 md:mx-0 flex py-3 justify-between items-center h-min">
            {imageLoaded
              ? (
                  <div className="flex items-center gap-2">
                    {typesPokemon.map((data, index) => (
                      <div
                        className={`flex items-center px-2 rounded-sm ${data.type.name}`}
                        key={index}
                      >
                        <p className="text-white text-lg uppercase ">
                          {imageLoaded ? data.type.name || "-" : "-"}
                        </p>
                      </div>
                    ))}
                  </div>
                ) || "-"
              : "-"}
            <div className="flex items-center h-full">
              {imageLoaded ? <Stars count={star} big={true} /> || "-" : "-"}
            </div>
          </div>
        </section>
        <section className="flex w-full">
          <div className="desc px-6 pb-6 flex flex-col md:px-0 md:h-full w-full">
            <div className="flex h-1 secondary mb-4"></div>
            {imageLoaded
              ? (
                  <div className="stats">
                    <div className="grid grid-cols-2 gap-2">
                      {statsPokemon.map((data, index) => (
                        <div
                          className={`flex justify-between px-1 rounded-sm ${data.stat.name}`}
                          key={index}
                        >
                          <p className="text-white text-md uppercase md:text-xl">
                            {imageLoaded ? data.stat.name || "-" : "-"}
                          </p>
                          <p className="text-white text-md md:text-xl">
                            {imageLoaded ? data.base_stat || "-" : "-"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) || "-"
              : "-"}
            <div className="flex h-1 secondary my-4"></div>
            <div className="flex justify-between px-1">
              <p className="poppins text-md text-white md:text-xl">
                Base Experience
              </p>
              <p className="poppins text-md text-white md:text-xl">
                {imageLoaded ? dataPokemon?.base_experience || "-" : "-"}
              </p>
            </div>
            <div className="flex justify-between px-1">
              <p className="poppins text-md text-white md:text-xl">Height</p>
              <p className="poppins text-md text-white md:text-xl">
                {imageLoaded ? dataPokemon?.height || "-" : "-"}
              </p>
            </div>
            <div className="flex justify-between px-1">
              <p className="poppins text-md text-white md:text-xl">Weight</p>
              <p className="poppins text-md text-white md:text-xl">
                {imageLoaded ? dataPokemon?.weight || "-" : "-"}
              </p>
            </div>
          </div>
        </section>
      </div>
      <BottomNavDetail
        id={id}
        name={dataPokemon?.name}
        price={price}
        star={star}
        url={dataPokemon?.sprites?.front_default}
        handler={notifHandle}
      />
    </div>
  );
}

export default DetailPages;
