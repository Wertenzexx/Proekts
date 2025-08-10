 document.addEventListener('DOMContentLoaded', function() {
            displayProducts(); // Вызываем функцию отображения товаров при загрузке страницы
        });

        function displayProducts() {
            // Получаем массив товаров из localStorage
            const productsJSON = localStorage.getItem('products');
            let products = productsJSON ? JSON.parse(productsJSON) : [];

            const productContainer = document.getElementById('productContainer');
            productContainer.innerHTML = ''; // Очищаем контейнер перед добавлением

            products.forEach((product, index) => { // Передаем index в callback
                // Создаем HTML для карточки товара
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');

                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <p class="product-price">${product.price} ₽</p>
                    </div>
                    <button class="delete-button" data-index="${index}">Удалить</button>
                `;

                // Добавляем карточку товара в контейнер
                productContainer.appendChild(productCard);
            });

            // Добавляем обработчики для кнопок "Удалить"
            const deleteButtons = document.querySelectorAll('.delete-button');
            deleteButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const indexToDelete = parseInt(this.dataset.index);
                    deleteProduct(indexToDelete);
                });
            });
        }

        function deleteProduct(indexToDelete) {
            // Получаем массив товаров из localStorage
            const productsJSON = localStorage.getItem('products');
            let products = productsJSON ? JSON.parse(productsJSON) : [];

            // Удаляем товар из массива по индексу
            products.splice(indexToDelete, 1);

            // Сохраняем обновленный массив в localStorage
            localStorage.setItem('products', JSON.stringify(products));

            // Обновляем отображение товаров
            displayProducts();
        }