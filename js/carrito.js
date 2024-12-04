// Array para guardar los productos en el carrito
let cart = [];

// Seleccionamos el carrito y el contador
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');

// Función para actualizar el contador y el total del carrito
function updateCart() {
    // Actualizamos el contador de productos
    cartCount.textContent = cart.length;

    // Calculamos el total del carrito
    let total = cart.reduce((acc, product) => acc + product.price, 0);
    cartTotal.textContent = total.toFixed(2);

    // Actualizamos los productos del carrito en el modal
    cartItems.innerHTML = ''; // Limpiamos los elementos anteriores
    cart.forEach((product, index) => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - $${product.price}`;

        // Crear un botón de eliminar
        const deleteButton = document.createElement('span');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function() {
            removeFromCart(index); // Eliminar producto por su índice
        });

        // Añadir el botón de eliminar al <li>
        li.appendChild(deleteButton);
        cartItems.appendChild(li);
    });
}

// Función para agregar un producto al carrito
function addToCart(product) {
    cart.push(product);
    updateCart();
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1); // Elimina el producto en la posición indicada
    updateCart(); // Actualiza el carrito después de la eliminación
}

// Función para abrir el modal del carrito
function openCart() {
    cartModal.style.display = 'block';
}

// Función para cerrar el modal del carrito
function closeCart() {
    cartModal.style.display = 'none';
}

// Evento para cerrar el modal al hacer clic en la "X"
document.querySelector('.close').addEventListener('click', closeCart);

// Abrir el carrito al hacer clic en el icono del carrito
document.getElementById('cart-icon').addEventListener('click', openCart);

// Añadir eventos a los botones "Añadir al carrito"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productElement = button.closest('.product');
        const productId = productElement.getAttribute('data-id');
        const productName = productElement.querySelector('h3').textContent;
        const productPrice = parseFloat(productElement.querySelector('p').textContent.replace('$', ''));

        const product = {
            id: productId,
            name: productName,
            price: productPrice
        };

        addToCart(product);
    });
});
