// Получаем элементы формы
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const authMessage = document.getElementById('authMessage');

// Функция для показа сообщения
function showMessage(message, type) {
    authMessage.textContent = message;
    authMessage.className = `auth-message ${type}`; // Добавляем классы 'success' или 'error'
    authMessage.style.display = 'block';
}

// Функция для скрытия сообщения
function hideMessage() {
    authMessage.style.display = 'none';
}

// Функция валидации поля
function validateField(input, errorElement, validationFn) {
    const value = input.value.trim();
    if (!validationFn(value)) {
        errorElement.textContent = input.dataset.errorMessage || 'Неверный формат'; // Используем data-атрибут для кастомизации
        errorElement.style.display = 'block';
        return false;
    } else {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        return true;
    }
}

// Функции валидации (примеры)
function isValidUsername(username) {
    return username.length >= 3;
}

function isValidPassword(password) {
    return password.length >= 6;
}

// Обработчик отправки формы
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Сбрасываем предыдущие сообщения об ошибках
    hideMessage();

    // Валидация полей
    const isUsernameValid = validateField(usernameInput, usernameError, isValidUsername);
    const isPasswordValid = validateField(passwordInput, passwordError, isValidPassword);

    if (isUsernameValid && isPasswordValid) {
        // Если валидация успешна, можно выполнить авторизацию (запрос на сервер, проверка данных и т.д.)
        // В этом примере - просто имитация успешной авторизации
        simulateLogin();
    }
});

// Функция для имитации авторизации
function simulateLogin() {
    // Имитируем запрос к серверу (задержка для наглядности)
    setTimeout(() => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Простая проверка логина и пароля (только для примера!)
        if (username === 'user' && password === 'password') {
            showMessage('Авторизация успешна!', 'success');

            // Здесь можно перенаправить пользователя на другую страницу
            // window.location.href = 'dashboard.html';

            // Сохранение состояния авторизации (пример, лучше использовать cookies или токен)
            localStorage.setItem('isLoggedIn', 'true');
            // localStorage.setItem('username', username); //Сохраняем имя пользователя

        } else {
            showMessage('Неверное имя пользователя или пароль.', 'error');
        }
    }, 1000); // Задержка в 1 секунду
}


// Проверка состояния авторизации при загрузке страницы
window.onload = function() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        // Если пользователь уже авторизован, перенаправляем его на защищенную страницу
        // window.location.href = 'dashboard.html';
    }
};