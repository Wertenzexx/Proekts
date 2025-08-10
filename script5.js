 function addToFavorites(product) {
     let favorites = localStorage.getItem('favorites');
     if (favorites === null) {
         favorites = [];
     } else {
         favorites = JSON.parse(favorites);
     }

     // Проверяем, не добавлен ли товар уже в избранное (по id)
     const alreadyInFavorites = favorites.some(fav => fav.id === product.id);

     if (!alreadyInFavorites) {
         favorites.push(product);
         localStorage.setItem('favorites', JSON.stringify(favorites));
         alert(product.name + ' добавлен в избранное!');
     } else {
         alert(product.name + ' уже в избранном!');
     }
 }

 function plat() { 
    window.location.href = "platezh.html"
 }

 document.addEventListener('DOMContentLoaded', function() {
     let balance = 1000000;
     let cart = [];

     const balanceElement = document.getElementById('balance');
     const addFundsBtn = document.getElementById('add-funds-btn');
     const cartItemsElement = document.getElementById('cart-items');
     const cartTotalElement = document.getElementById('cart-total');
     const checkoutBtn = document.getElementById('checkout-btn');
     const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

     // Функция обновления баланса на странице
     function updateBalance() {
         balanceElement.textContent = balance;
     }

     // Функция добавления товара в корзину
     function addToCart(productName, productPrice) {
         cart.push({ name: productName, price: parseFloat(productPrice) }); // Преобразуем цену в число
         updateCart();
     }

     // Функция удаления товара из корзины
     function removeFromCart(index) {
         cart.splice(index, 1); // Удаляем один элемент из массива по индексу
         updateCart();
     }

     // Функция обновления корзины на странице
     function updateCart() {
         cartItemsElement.innerHTML = '';
         let total = 0;
         cart.forEach((item, index) => { // Добавляем индекс элемента
             const listItem = document.createElement('li');
             listItem.textContent = `${item.name} - ${item.price} `;

             // Создаем кнопку "Удалить"
             const removeButton = document.createElement('button');
             removeButton.textContent = 'Удалить';
             removeButton.addEventListener('click', function() {
                 removeFromCart(index); // Передаем индекс для удаления
             });

             listItem.appendChild(removeButton); // Добавляем кнопку в элемент списка
             cartItemsElement.appendChild(listItem);
             total += item.price;
         });
         cartTotalElement.textContent = total;
     }

     // Обработчик нажатия на кнопку "Пополнить баланс"
     addFundsBtn.addEventListener('click', function() {
       let amount = prompt("Введите сумму пополнения")
         balance += parseInt(amount); 
          localStorage.setItem('balance', balance);
         updateBalance();
         alert('Баланс успешно пополнен на ' +  balance + ' руб. Текущий баланс: ' + balance + ' руб.');
     });

     // Обработчики нажатия на кнопки "Добавить в корзину"
     addToCartButtons.forEach(button => {
         button.addEventListener('click', function() {
             const productName = button.dataset.productName;
             const productPrice = button.dataset.productPrice;
             addToCart(productName, productPrice);
         });
     });

     // Обработчик нажатия на кнопку "Оформить заказ"
     checkoutBtn.addEventListener('click', function() {
         const cartTotal = parseFloat(cartTotalElement.textContent);

         if (balance >= cartTotal) {
             balance -= cartTotal;
             updateBalance();
             alert('Заказ оформлен! Спасибо за покупку.');
             cart = []; // Очищаем корзину
             updateCart();
         } else {
             alert('Недостаточно средств на балансе.');
         }
     });

     // Инициализация
     updateBalance();
     updateCart();
 });