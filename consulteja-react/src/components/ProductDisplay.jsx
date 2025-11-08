import React from 'react';

function ProductDisplay({ product }) {
  if (!product) {
    return null; // Não renderiza nada se não houver produto
  }

  // Formata o preço para o padrão brasileiro
  const formattedPrice = `R$ ${product.price.toFixed(2).replace('.', ',')}`;

  return (
    <div className="result-area">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">{formattedPrice}</p>
      <p className="product-description">{product.description}</p>
    </div>
  );
}

export default ProductDisplay;
