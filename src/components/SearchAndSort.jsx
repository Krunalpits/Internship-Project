
import React from 'react';
import "./SearchAndSort.css";

const SearchAndSort = ({ searchQuery, setSearchQuery, sortKey, setSortKey, sortOrder, setSortOrder }) => {
  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="sort-controls">
        <p className="sort-text">Sort:</p>
        <label> 
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
           
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>
        </label>

        <label>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>

      </div>
    </div>
  );
};

export default SearchAndSort;
