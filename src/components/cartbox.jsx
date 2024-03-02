import React, { useEffect, useState } from "react";
import Stars from "../components/stars";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import topline from "../assets/topline.png";
import bottomline from "../assets/bottomline.png";

function CartBox({
  id,
  url,
  name,
  stars,
  price,
  setquantity,
  onDelete,
  onSum,
  onMin,
  onChange,
  all,
  setAll,
  selected,
}) {
  const [isChecked, setIsChecked] = useState();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onChange(id);
    setAll(false);
  };

  useEffect(() => {
    if (selected.includes(id)) {
      setIsChecked(true);
    } else setIsChecked(false);
  }, [selected]);

  const sumQuantity = () => {
    onSum(id);
  };

  const minQuantity = () => {
    onMin(id);
  };

  const handleDelete = () => {
    setIsChecked(false);
    onDelete(id);
  };

  return (
    <div className="my-1 cartbg flex w-full flex-col rounded-md">
      <div className="flex">
        <div className="secondary relative flex">
          <img
            src={topline}
            alt="linetop"
            className="absolute right-0 top-0 lg:w-10 w-10"
          />
          <img src={url} alt={name} className="w-40" />
          <img
            src={bottomline}
            alt="linetop"
            className="absolute left-0 bottom-0 lg:w-10 w-10"
          />
        </div>
        <div className="flex justify-between w-full px-4 py-2">
          <div className="flex flex-col justify-center">
            <h1 className="text-white font-bold uppercase poppins">{name}</h1>
            <h1 className="text-white text-lg mt-4 poppins">${price}</h1>
            <Stars count={stars} />
          </div>
          <div className="flex items-center flex-col justify-center">
            <div
              className="flex w-7 h-7 border-2 rounded-md cursor-pointer"
              onClick={handleCheckboxChange}
            >
              {isChecked ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    duration: 0.8,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="white"
                    className="w-full h-full custom rounded-md"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </motion.div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center my-2 mx-4 ">
        <Link
          to={`/pokemon/${id}/detail`}
          state={{ price: price, star: stars }}
        >
          <p className="text-gray-400">Check Pokemon</p>
        </Link>
        <div className="flex items-center">
          <div className="mx-3 flex cursor-pointer" onClick={handleDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#fb2c86"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
          <div className="inline-flex w-min border-2 rounded-md p-1">
            <div onClick={minQuantity} className="cursor-pointer btn-ctr">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15"
                />
              </svg>
            </div>
            <div className="flex w-4 mx-2 justify-center">
              <p className="text-white">{setquantity}</p>
            </div>
            <div onClick={sumQuantity} className="cursor-pointer btn-ctr">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartBox;
