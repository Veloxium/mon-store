import React from "react";

function Loader({ bigLoad }) {
  return (
    <svg
      className={
        bigLoad ? "rings w-[100px] h-[200px] md:h-[300px]" : "rings w-[40px] h-[40px]"
      }
      viewBox="25 25 50 50"
      strokeWidth="5"
    >
      <circle cx="50" cy="50" r="20" />
    </svg>
  );
}

export default Loader;
