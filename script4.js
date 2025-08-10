document.addEventListener('DOMContentLoaded', function() {
    // Получаем ссылки на кнопки
    const getCodeButton = document.getElementById('getCodeButton');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');

    // Добавляем обработчик события для кнопки "Получить код"
    if (getCodeButton) {
        getCodeButton.addEventListener('click', function(event) {
            event.preventDefault(); // Предотвращаем переход по ссылке

            // Здесь нужно добавить код для отправки запроса на получение кода
            // Например, отправка AJAX-запроса на сервер, который сгенерирует и отправит код

            // Пример:
            alert('Отправляем запрос на получение кода...');
            // Добавьте здесь ваш AJAX запрос к серверу.
        });
    } else {
        console.error('Кнопка "Получить код" не найдена.');
    }


    // Добавляем обработчик события для ссылки "Забыли пароль?"
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(event) {
            event.preventDefault(); // Предотвращаем переход по ссылке

            // Здесь нужно добавить код для перенаправления пользователя на страницу восстановления пароля
            // Или отобразить модальное окно с формой для ввода email

            // Пример:
            alert('Переходим на страницу восстановления пароля...');
            // Добавьте здесь ваш код для перенаправления или открытия модального окна.
        });
    } else {
        console.error('Ссылка "Забыли пароль?" не найдена.');
    }
});
getCodeButton.addEventListener('click', function(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value; // Получаем имя пользователя

    fetch('/get_code', { // Замените '/get_code' на URL вашего серверного скрипта
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username }) // Отправляем имя пользователя на сервер
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Код отправлен на вашу электронную почту.');
        } else {
            alert('Ошибка при отправке кода: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке запроса.');
    });
});