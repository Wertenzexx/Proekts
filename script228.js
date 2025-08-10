
document.addEventListener('DOMContentLoaded', function() {

    const loginForm = document.getElementById('loginForm');
    const loginUsernameInput = document.getElementById('loginUsername');
    const loginPasswordInput = document.getElementById('loginPassword');
    const loginCodeInput = document.getElementById('loginCode');
    const authMessageDiv = document.getElementById('authMessage');

    // Ссылки для переключения между формами
    const showRegisterFormLink = document.getElementById('showRegisterFormLink');
    const showLoginFormLink = document.getElementById('showLoginFormLink');
    const loginFormContainer = document.getElementById('loginFormContainer');
    const registerFormContainer = document.getElementById('registerFormContainer');

    // Элементы для социальной авторизации (пока неактивны)
    const vkLoginLink = document.getElementById('vkLoginLink');
    const tgLoginLink = document.getElementById('tgLoginLink');
    const googleLoginLink = document.getElementById('googleLoginLink');

    // Дополнительные элементы
    const getCodeButton = document.getElementById('getCodeButton');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');

    // Переменная для хранения количества неправильных попыток
    let incorrectAttempts = 0;
    const maxAttempts = 3;

    // Функция для перенаправления на страницу блокировки
    function redirectToLockout() {
        window.location.href = 'tr.html'; // Замените 'lockout.html' на URL вашей страницы блокировки
    }

    // Функция для отображения сообщений
    function showMessage(message, isError = false) {
        authMessageDiv.textContent = message;
        authMessageDiv.className = 'auth-message ' + (isError ? 'error' : 'success');
    }

    // Обработчик отправки формы авторизации
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = loginUsernameInput.value;
        const password = loginPasswordInput.value;
        const code = loginCodeInput.value;

      
        if (username === 'user' && password === 'password' && code === '1234') {
            showMessage('Авторизация успешна!', false);
             incorrectAttempts = 0; 
            window.location.href = 'dy.html'; 
        } else {
            incorrectAttempts++; // Увеличиваем счетчик неправильных попыток

            showMessage('Неверное имя пользователя, пароль или код. Попытка ' + incorrectAttempts + ' из ' + maxAttempts, true);

            if (incorrectAttempts >= maxAttempts) {
                redirectToLockout();
            }
        }
    });

    // Обработчики для переключения между формами
    showRegisterFormLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginFormContainer.style.display = 'none';
        registerFormContainer.style.display = 'block';
    });

    showLoginFormLink.addEventListener('click', function(event) {
        event.preventDefault();
        registerFormContainer.style.display = 'none';
        loginFormContainer.style.display = 'block';
    });

    // **ВАЖНО:** В реальном проекте НЕ храните данные пользователей в JavaScript!
    // Это только для демонстрации.
});