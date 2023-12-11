import React from 'react'
import { useDataContex } from "../utils/datacontext";



function BottomNavDetail({id, url, name, price, star, handler}) {
  const { addToCart } = useDataContex();
  const idInt = parseInt(id);
    const handleAddToCart = () => {
      const newItem = {
        id: idInt,
        url: url,
        name: name,
        price: price,
        star: star,
      };
      addToCart(newItem);
      handler();
    };

  return (
    <div className="sticky gap-4 flex bottom-0 w-full primary bottomnav px-6 py-4 md:px-[120px]">
      <button className="border-2 p-2 rounded-lg inline-flex">
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
            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
          />
        </svg>
      </button>
      <button className="border-custom border-2 rounded-lg poppins py-2 w-full flex justify-center items-center text-white">
        <p>Buy Now</p>
      </button>
      <button
        className="custom rounded-lg poppins py-2 w-full flex justify-center items-center text-white"
        onClick={handleAddToCart}
      >
        <p>Add to Cart</p>
      </button>
    </div>
  );
}

export default BottomNavDetail