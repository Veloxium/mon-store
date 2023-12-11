import React from "react";

function Searchbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    onSearch(value); // Panggil fungsi pencarian ketika nilai berubah
  };
  return (
    <input
      className="searchfill px-2 text-white"
      type="text"
      placeholder="Cari Pokemon"
      value={searchTerm}
      onChange={handleInputChange}
    />
  );
}

export default Searchbar;
