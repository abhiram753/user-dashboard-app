import React from 'react';

const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="input-group mb-3">
      <input
        className="form-control"
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        aria-label="Search"
      />
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={handleClear}
        disabled={!value}
      >
        Clear
      </button>
    </div>
  );
};

export default SearchBar;
