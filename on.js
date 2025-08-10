 function addToCart(name, price, image) {
            let cart = localStorage.getItem('cart');
            cart = cart ? JSON.parse(cart) : [];
            cart.push({ name: name, price: price, image: image });
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Товар "' + name + '" добавлен в корзину!');
        }

        function updateBalanceDisplay() {
            let balance = localStorage.getItem('balance') || 0;
            document.getElementById('balance').textContent = balance;
        }

        function checkout() {
            let cart = localStorage.getItem('cart');
            cart = cart ? JSON.parse(cart) : [];
            let totalPrice = 0;

            cart.forEach(item => {
                totalPrice += item.price;
            });

            let balance = parseFloat(localStorage.getItem('balance') || 0);

            if (totalPrice > balance) {
                alert('Недостаточно средств на балансе!');
                return;
            }

            balance -= totalPrice;
            localStorage.setItem('balance', balance);
            localStorage.setItem('cart', JSON.stringify([])); // Очищаем корзину
            alert('Оплата прошла успешно! Остаток на балансе: ' + balance + ' руб.');
            updateBalanceDisplay();
        }

        window.onload = function() {
            if (!localStorage.getItem('balance')) {
                localStorage.setItem('balance', 1000); // Начальный баланс
            }
            updateBalanceDisplay();
        };