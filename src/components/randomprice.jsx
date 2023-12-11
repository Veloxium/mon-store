import React from "react";

function getRandomNumber(min, max) {
  // Generate a random number between 0 and 1 (excluding 1)
  const random = Math.random();

  // Calculate the random number within the desired range
  const randomNumberInRange = min + random * (max - min);

  // Round the number to two decimal places
  return randomNumberInRange.toFixed(2);
}

const RandomPrice = React.memo(() => {
  const randomNum = getRandomNumber(76.0, 99.99);

  return (
    <div>
      <p className="text-sm mt-2">${randomNum}</p>
    </div>
  );
});

export default RandomPrice;
