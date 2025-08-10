
// Получаем элементы формы авторизации
const loginFormContainer = document.getElementById('loginFormContainer');
const loginForm = document.getElementById('loginForm');
const loginUsernameInput = document.getElementById('loginUsername');
const loginPasswordInput = document.getElementById('loginPassword');
const loginCodeInput = document.getElementById('loginCode'); //  <<---  ПОЛУЧАЕМ ПОЛЕ КОДА
const loginUsernameError = document.getElementById('loginUsernameError');
const loginPasswordError = document.getElementById('loginPasswordError');
const loginCodeError = document.getElementById('loginCodeError'); //  <<---  ПОЛУЧАЕМ ЭЛЕМЕНТ ДЛЯ ОШИБКИ КОДА

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
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const getCodeButton = document.getElementById('getCodeButton');

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

// Функция для генерации случайного пароля
function generateRandomPassword(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }
    return password;
}

// Функция для генерации случайного 4-значного кода
function generateRandomCode() {
    return Math.floor(1000 + Math.random() * 9000); // От 1000 до 9999
}

let generatedCode = null; // Сохраняем сгенерированный код

// Обработчик отправки формы авторизации
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Сбрасываем предыдущие сообщения об ошибках
    hideMessage();

    // Валидация полей
    const isUsernameValid = validateField(loginUsernameInput, loginUsernameError, isValidUsername);
    const isPasswordValid = validateField(loginPasswordInput, loginPasswordError, isValidPassword);
    const isCodeValid = loginCodeInput.value.trim() === String(generatedCode); // Проверяем совпадение кода

    if (!isCodeValid) {
        loginCodeError.textContent = 'Неверный код.';
        loginCodeError.style.display = 'block';
    } else {
        loginCodeError.textContent = '';
        loginCodeError.style.display = 'none';
    }


    if (isUsernameValid && isPasswordValid && isCodeValid) {
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

        // Получаем зарегистрированного пользователя из localStorage
        const registeredUser = localStorage.getItem('registeredUser');
        const parsedUser = registeredUser ? JSON.parse(registeredUser) : null;

        // Проверяем, есть ли такой пользователь и верен ли пароль
        if (parsedUser && parsedUser.username === username && parsedUser.password === password) {
            showMessage('Авторизация успешна!', 'success');

            // Здесь можно перенаправить пользователя на другую страницу  <--------  ПЕРЕНАПРАВЛЕНИЕ
            window.location.href = 'index.html';  //  Замени на URL твоей главной страницы

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
        const password = registerPasswordInput.value.trim();

        // Сохраняем данные пользователя в localStorage (НЕБЕЗОПАСНО!)
        const user = {
            username: username,
            password: password // НИКОГДА не храните пароль в открытом виде!
        };
        localStorage.setItem('registeredUser', JSON.stringify(user));

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

// Обработчик для ссылки "Забыли пароль?"
forgotPasswordLink.addEventListener('click', function(event) {
    event.preventDefault();
    const newPassword = generateRandomPassword(8);
    alert(`Ваш новый пароль: ${newPassword}. Пожалуйста, запишите его.`);

    // В реальном приложении - отправка пароля на email,
    // обновление пароля в базе данных и т.д.
});

// Обработчик для кнопки "Получить код"
getCodeButton.addEventListener('click', function(event) {
    event.preventDefault();
    generatedCode = generateRandomCode(); // Сохраняем сгенерированный код
    alert(`Ваш код: ${generatedCode}`); //  ПОКАЗЫВАЕМ СГЕНЕРИРОВАННЫЙ КОД
    else
    // В реальном приложении - отправка кода на email или телефон
});



// Проверка состояния авторизации при загрузке страницы
window.onload = function() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        // Если пользователь уже авторизован, перенаправляем его на защищенную страницу
        window.location.href = 'dy.html'; //   Замени на URL твоей главной страницы
    }
};
