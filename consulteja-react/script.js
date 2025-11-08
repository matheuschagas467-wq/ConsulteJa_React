document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const barcodeInput = document.getElementById('barcode-input');
    const resultArea = document.getElementById('result-area');
    const messageArea = document.getElementById('message-area');

    // Elementos de resultado
    const productImage = document.getElementById('product-image');
    const productName = document.getElementById('product-name');
    const productPrice = document.getElementById('product-price');
    const productDescription = document.getElementById('product-description');

    const searchProduct = async () => {
        const barcode = barcodeInput.value.trim();

        // Limpa a tela antes de nova busca
        resultArea.classList.add('hidden');
        messageArea.textContent = '';

        if (!barcode) {
            messageArea.textContent = 'Por favor, digite um código de barras.';
            messageArea.style.color = 'orange';
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/products/${barcode}` );

            if (response.ok) {
                const product = await response.json();
                displayProduct(product);
            } else if (response.status === 404) {
                displayError('Produto não encontrado.');
            } else {
                displayError('Ocorreu um erro no servidor. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro de rede:', error);
            displayError('Não foi possível conectar ao servidor. Verifique se ele está rodando.');
        }
    };

    const displayProduct = (product) => {
        productImage.src = product.imageUrl;
        productImage.alt = product.name;
        productName.textContent = product.name;
        productPrice.textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
        productDescription.textContent = product.description;
        
        resultArea.classList.remove('hidden');
    };

    const displayError = (message) => {
        messageArea.textContent = message;
        messageArea.style.color = 'red';
    };

    searchButton.addEventListener('click', searchProduct);
    
    // Permite buscar pressionando Enter no campo de input
    barcodeInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            searchProduct();
        }
    });
});
