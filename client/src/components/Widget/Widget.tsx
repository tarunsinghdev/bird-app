import React from 'react';
import Follow from './Follow/Follow';
import SearchBar from './SearchBar/SearchBar';

const Widget = () => {
  return (
    <div className="widget">
      <SearchBar />
      <Follow />
    </div>
  );
};

export default Widget;
