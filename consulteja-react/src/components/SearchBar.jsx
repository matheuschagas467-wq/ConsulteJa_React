import React from 'react';

function SearchBar({ barcode, setBarcode, onSearch }) {
  // Função para lidar com a busca ao pressionar Enter
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="search-box">
      <input
        type="text"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Digite o código de barras"
      />
      <button onClick={onSearch}>Consultar</button>
    </div>
  );
}

export default SearchBar;
