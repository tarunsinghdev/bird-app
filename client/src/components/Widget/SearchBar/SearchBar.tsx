import React from 'react';

const SearchBar = () => {
  return (
    <div className="border searchbar d-none d-xl-block ">
      <i className="fas fa-search"></i>
      <input
        className="rounded-pill"
        type="text"
        placeholder="Search bird app..."
      ></input>
    </div>
  );
};

export default SearchBar;
