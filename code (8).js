
// Получаем элементы формы авторизации
const loginFormContainer = document.getElementById('loginFormContainer');
const loginForm = document.getElementById('loginForm');
const loginUsernameInput = document.getElementById('loginUsername');
const loginPasswordInput = document.getElementById('loginPassword');
const loginUsernameError = document.getElementById('loginUsernameError');
const loginPasswordError = document.getElementById('loginPasswordError');

// Получаем элементы формы регистрации
const registerFormContainer = document.getElementById('registerFormContainer');
const registerForm = document.getElementById('registerForm');
const registerUsernameInput = document.getElementById('registerUsername');
const registerPasswordInput = document.getElementById('registerPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const registerUsernameError = document.getElementById('registerUsernameError');
const registerPasswordError = document.getElementById('registerPasswordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

// Получаем ссылки для переключения форм
const showRegisterFormLink = document.getElementById('showRegisterFormLink');
const showLoginFormLink = document.getElementById('showLoginFormLink');

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

// Функция для проверки совпадения паролей
function passwordsMatch(password, confirmPassword) {
    return password === confirmPassword;
}

// Обработчик отправки формы авторизации
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Сбрасываем предыдущие сообщения об ошибках
    hideMessage();

    // Валидация полей
    const isUsernameValid = validateField(loginUsernameInput, loginUsernameError, isValidUsername);
    const isPasswordValid = validateField(loginPasswordInput, loginPasswordError, isValidPassword);

    if (isUsernameValid && isPasswordValid) {
        // Если валидация успешна, можно выполнить авторизацию (запрос на сервер, проверка данных и т.д.)
        // В этом примере - просто имитация успешной авторизации
        simulateLogin();
    }
});

// Обработчик отправки формы регистрации
registerForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Сбрасываем предыдущие сообщения об ошибках
    hideMessage();

    // Валидация полей
    const isUsernameValid = validateField(registerUsernameInput, registerUsernameError, isValidUsername);
    const isPasswordValid = validateField(registerPasswordInput, registerPasswordError, isValidPassword);
    const doPasswordsMatch = validateField(confirmPasswordInput, confirmPasswordError, (value) => passwordsMatch(registerPasswordInput.value, value)); // Пароли должны совпадать

    if (isUsernameValid && isPasswordValid && doPasswordsMatch) {
        // Если валидация успешна, можно выполнить регистрацию (запрос на сервер, сохранение данных и т.д.)
        // В этом примере - просто имитация успешной регистрации
        simulateRegistration();
    }
});

// Функция для имитации авторизации
function simulateLogin() {
    // Имитируем запрос к серверу (задержка для наглядности)
    setTimeout(() => {
        const username = loginUsernameInput.value.trim();
        const password = loginPasswordInput.value.trim();

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

// Функция для имитации регистрации
function simulateRegistration() {
    setTimeout(() => {
        const username = registerUsernameInput.value.trim();
        showMessage(`Регистрация прошла успешно! Добро пожаловать, ${username}!`, 'success');

        // Переключаемся на форму авторизации после успешной регистрации
        showLoginForm();
    }, 1000);
}

// Функция для показа формы регистрации
function showRegisterForm() {
    loginFormContainer.style.display = 'none';
    registerFormContainer.style.display = 'block';
    hideMessage(); // Скрываем сообщение
}

// Функция для показа формы авторизации
function showLoginForm() {
    loginFormContainer.style.display = 'block';
    registerFormContainer.style.display = 'none';
    hideMessage(); // Скрываем сообщение
}

// Обработчики для ссылок переключения форм
showRegisterFormLink.addEventListener('click', function(event) {
    event.preventDefault();
    showRegisterForm();
});

showLoginFormLink.addEventListener('click', function(event) {
    event.preventDefault();
    showLoginForm();
});


// Проверка состояния авторизации при загрузке страницы
window.onload = function() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        // Если пользователь уже авторизован, перенаправляем его на защищенную страницу
        // window.location.href = 'dashboard.html';
    }
};
