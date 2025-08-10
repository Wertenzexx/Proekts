const cartItemsDiv = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

function displayCart() {
    // Получаем корзину из localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    let totalPrice = 0;
    cartItemsDiv.innerHTML = ''; // Очищаем содержимое

    if (cart.length === 0) {
        cartItemsDiv.textContent = 'Корзина пуста.';
    } else {
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <span>${item.name} (${item.quantity} шт.)</span>
                <span>$${item.price * item.quantity}</span>
            `;
            cartItemsDiv.appendChild(itemDiv);
            totalPrice += item.price * item.quantity;
        });
    }

    totalPriceElement.textContent = `Итого: $${totalPrice}`;
}

// Вызываем функцию отображения корзины при загрузке страницы
displayCart();
