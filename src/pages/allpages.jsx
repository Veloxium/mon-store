import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import mosnter from "../assets/monster.png";
import CardPokemon from "../components/cardpokemon";
import ButtonCustom from "../components/buttoncustom";
import NavbarCustom from "../components/navbarcustom";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDataContex } from "../utils/datacontext";
import Notification from "../components/notification";

function AllPages() {
  const { id } = useParams();
  const idInteger = parseInt(id);
  const { isToggled, setIsToggled } = useDataContex();
  const [newPokemon, setNewPokemon] = useState([]);
  const [page, setNewPage] = useState((idInteger - 1) * 24);

  const prevId = idInteger <= 1 ? 1 : idInteger - 1;
  const nextId = idInteger ? idInteger + 1 : 2;

  const [isNotif, setIsNotif] = useState(false);

  useEffect(() => {
    const add = (idInteger - 1) * 24;
    if (id != 1) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setNewPage(add);
    }
    if (id == 1) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setNewPage(0);
    }
  }, [id]);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=24`)
      .then(function (res) {
        const results = res.data.results;
        setNewPokemon(results);
      });
  }, [page]);

  const toggleSwitch = () => {
    setIsToggled(!isToggled);
  };

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
        <p className="text-white text-2xl poppins font-bold">All</p>
        <img
          src={mosnter}
          alt="title"
          srcSet=""
          className="w-[30%] lg:w-[10%] mt-[-14px]"
        />
      </div>
      <NavbarCustom />
      <div className="md:px-[120px] px-6 py-4 min-h-screen">
        <div className="flex justify-end mb-4 items-center">
          <p className="pixel text-xs text-white">Pixel</p>
          <div className="toggle-switch mx-2">
            <label className="switch">
              <input
                type="checkbox"
                checked={isToggled}
                onChange={toggleSwitch}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 gap-2 lg:gap-6 grid-cols-2 ">
          {newPokemon.map((data, index) => (
            <motion.div
              id="animation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className="flex justify-center items-center"
              key={`${data.name}-${index}`}
            >
              <CardPokemon
                name={data.name}
                key={index}
                url={data.url}
                id={index + 1 + page}
                pixel={isToggled}
                notifHandle={notifHandle}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex justify-center sticky bottom-4 z-50 mt-4">
        <div className="inline-flex gap-4 justify-center items-center py-2 px-2 rounded-lg primary">
          <Link to={`/pokemon/${prevId}`}>
            <ButtonCustom name={"Prev"} />
          </Link>
          <div className="page flex justify-center w-12 py-2 px-4 font-bold poppins text-white">
            {id}
          </div>
          <Link to={`/pokemon/${nextId}`}>
            <ButtonCustom name={"Next"} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AllPages;
