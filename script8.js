
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

        function openPaymentModal() {
            document.getElementById('paymentModal').style.display = 'block';
        }

        function closePaymentModal() {
            document.getElementById('paymentModal').style.display = 'none';
        }

        function addBalance() {
            let amount = parseFloat(document.getElementById('amount').value);
            if (isNaN(amount) || amount <= 0) {
                alert('Введите корректную сумму для пополнения.');
                return;
                
                
            }
       
            let balance = parseFloat(localStorage.getItem('balance') || 0);
            balance += amount;
            localStorage.setItem('balance', balance);
            updateBalanceDisplay();
            closePaymentModal();
            alert('Баланс успешно пополнен на ' +  amount + ' руб. Текущий баланс: ' + balance+ ' руб.');
        }

        window.onload = function() {
            if (!localStorage.getItem('balance')) {
                localStorage.setItem('balance', 1000); // Начальный баланс
            }
            updateBalanceDisplay();
        };