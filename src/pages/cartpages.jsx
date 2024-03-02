import React, { useEffect, useState } from "react";
import { useDataContex } from "../utils/datacontext";
import CartBox from "../components/cartbox";
import { motion, AnimatePresence } from "framer-motion";
import ButtonCustom from "../components/buttoncustom";

function CartPages() {
  const { cartItems, setCartItems } = useDataContex();
  const [selectedItems, setSelectedItems] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [finalSelectedItems, setFinalSelectedItems] = useState([]);
  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    const filteredSelectedItems = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );

    const sum = filteredSelectedItems.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0
    );

    setFinalSelectedItems(filteredSelectedItems);
    setTotalSum(sum.toFixed(2));
  }, [selectedItems, cartItems]);

  const handleDeleteItem = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== itemId)
    );
  };

  const updateCartItemQuantity = (itemId, updateFn) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: updateFn(item.quantity) }
          : item
      )
    );
  };

  const sumQuantity = (itemId) => {
    updateCartItemQuantity(itemId, (quantity) => quantity + 1);
  };

  const minQuantity = (itemId) => {
    updateCartItemQuantity(itemId, (quantity) =>
      quantity !== 1 ? quantity - 1 : quantity
    );
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    );
  };

  const handleAll = () => {
    if (!isChecked) {
      setSelectedItems(cartItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
    setIsChecked(!isChecked);
  };

  const handleDetail = () => {
    setIsDetail((prevIsDetail) => !prevIsDetail);
  };

  // console.log(totalSum.toFixed(2));
  // console.log(selectedItems);
  // console.log(isChecked);
  // console.log(finalSelectedItems);
  // console.log(selectedItems);

  return (
    <div className="min-h-screen primary">
      <div className="pt-10 px-6 lg:px-[120px] flex justify-center items-center flex-col pb-36">
        <h1 className="text-2xl font-bold text-white poppins">My Cart</h1>
        <div className="w-full mt-10">
          {cartItems.length !== 0 && (
            <div className="flex mb-4 gap-2 items-center">
              <p className="poppins text-md text-white md:text-xl">Select All</p>
              <div
                className="flex w-5 h-5 md:w-7 md:h-7 border-2 rounded-md cursor-pointer"
                onClick={handleAll}
              >
                {isChecked && (
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
                )}
              </div>
            </div>
          )}
          {cartItems.length !== 0 ? (
            cartItems.map((item, index) => (
              <CartBox
                id={item.id}
                url={item.url}
                name={item.name}
                price={item.price}
                stars={item.star}
                setquantity={item.quantity}
                onDelete={handleDeleteItem}
                onSum={sumQuantity}
                onMin={minQuantity}
                key={index}
                onChange={handleCheckboxChange}
                all={isChecked}
                setAll={setIsChecked}
                selected={selectedItems}
              />
            ))
          ) : (
            <div className="flex w-full justify-center items-center">
              <p className="text-white">There are no Pokemons.</p>
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
                  d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      <motion.div
        initial={{ y: 300 }}
        animate={{ y: isDetail ? -120 : 250 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 40,
          duration: 0.8,
        }}
        className="flex-col detail fixed bottom-0 md:px-[120px]"
      >
        <button
          onClick={handleDetail}
          className="px-6 py-1 custom inline-flex rounded-t-md w-min"
        >
          <p className="text-white poppins">Detail</p>
        </button>
        <div className="px-6 py-4 secondary text-white w-screen z-20 md:w-[400px]">
          <div className="flex justify-between py-1 font-bold uppercase ">
            <p>Pokemon</p>
            <p>Price</p>
          </div>
          <div className="w-full bg-white h-1 my-1 rounded-sm"></div>
          <div className="flex flex-col h-[300px] overflow-y-scroll scrollbar-style">
            {finalSelectedItems.map((item, index) => (
              <div key={index} className="flex justify-between py-1 md:mr-2">
                <div className="flex flex-col justify-center">
                  <p className="uppercase">{item.name}</p>
                  <p className="text-sm text-white opacity-70">
                    {item.quantity}x
                  </p>
                </div>
                <p>${item.price}</p>
              </div>
            ))}
          </div>
          <div className="w-full bg-white h-1 mt-1 rounded-sm"></div>
        </div>
      </motion.div>
      <div className="fixed bottom-0 flex-col px-6 py-6 secondary w-full md:px-[120px]">
        <div className="flex justify-between w-full">
          <p className="text-white poppins font-bold">Total</p>
          <p className="text-white poppins font-bold">
            <span className="lets mr-1">$</span>
            {totalSum}
          </p>
        </div>
        <div className="flex mt-6">
          <ButtonCustom name={"Checkout"} fill={true} />
        </div>
      </div>
    </div>
  );
}

export default CartPages;
