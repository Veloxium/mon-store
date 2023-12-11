import React from "react";

function ButtonCustom({ name, onClick, fill }) {
  return (
    <div
      className={
        fill ? "btn px-4 py-1 inline-flex custom w-full justify-center" : "btn px-4 py-1 inline-flex w-full justify-center"
      }
    >
      <button
        className="text-lg font-bold text-white poppins"
        onClick={onClick}
      >
        {name}
      </button>
    </div>
  );
}

export default ButtonCustom;
