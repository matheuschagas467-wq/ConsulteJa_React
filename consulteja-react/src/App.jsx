import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import ProductDisplay from './components/ProductDisplay';
import Message from './components/Message';
import './App.css'; // Usaremos App.css em vez de index.css para estilos específicos

function App() {
  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    // Reseta os estados antes de cada busca
    setProduct(null);
    setError(null);
    setIsLoading(true);

    if (!barcode) {
      setError('Por favor, digite um código de barras.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/products/${barcode}` );
      
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else if (response.status === 404) {
        setError('Produto não encontrado.');
      } else {
        setError('Ocorreu um erro no servidor. Tente novamente.');
      }
    } catch (err) {
      console.error("Erro de rede:", err);
      setError('Não foi possível conectar ao servidor. Verifique se ele está rodando.');
    } finally {
      setIsLoading(false); // Garante que o loading termine
    }
  };

  return (
    <main className="container">
      <h1>ConsulteJá <span className="react-badge">React</span></h1>
      <p className="subtitle">Consulte produtos pelo código de barras.</p>
      
      <SearchBar barcode={barcode} setBarcode={setBarcode} onSearch={handleSearch} />
      
      {isLoading && <Message text="Buscando..." type="loading" />}
      {error && <Message text={error} type="error" />}
      
      <ProductDisplay product={product} />
    </main>
  );
}

export default App;
