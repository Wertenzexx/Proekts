const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price); // Преобразуем цену в число

        // Получаем текущую корзину из localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Проверяем, есть ли уже товар в корзине
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            // Если товар уже есть, увеличиваем количество
            existingItem.quantity++;
        } else {
            // Если товара нет, добавляем его в корзину
            cart.push({ id, name, price, quantity: 1 });
        }

        // Сохраняем корзину в localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`Товар "${name}" добавлен в корзину!`);
    });
});