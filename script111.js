document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('reviewForm');
    const reviewsContainer = document.getElementById('reviewsContainer');
    const errorMsg = document.getElementById('errorMsg');

    // Загрузка отзывов из localStorage при загрузке страницы
    loadReviews();

    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const productName = document.getElementById('productName').value.trim();
        const reviewText = document.getElementById('reviewText').value.trim();
        const starRating = document.getElementById('starRating').value;

        if (productName === "" || reviewText === "" || starRating === "") {
            errorMsg.textContent = "Пожалуйста, заполните все поля!";
            return;
        } else {
            errorMsg.textContent = "";
        }

        const now = new Date();
        const review = {
            product: productName,
            text: reviewText,
            rating: parseInt(starRating), // Преобразуем в число
            timestamp: now.toISOString()
        };

        saveReview(review);
        addReviewToPage(review);
        reviewForm.reset();
    });

    function saveReview(review) {
        let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        reviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    function addReviewToPage(review, index) {
        const reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review');

        const reviewDate = new Date(review.timestamp);
        const formattedDate = reviewDate.toLocaleString();

        // Преобразуем числовую оценку в строку звёзд
        const starRatingString = '★'.repeat(review.rating);

        reviewDiv.innerHTML = `
            <h3>${review.product}</h3>
            <p>Оценка: ${starRatingString}</p>
            <p>${review.text}</p>
            <p class="date">Дата публикации: ${formattedDate}</p>
            <button class="delete-button" data-index="${index}">Удалить</button>
        `;

        reviewsContainer.appendChild(reviewDiv);

        const deleteButton = reviewDiv.querySelector('.delete-button');
        deleteButton.addEventListener('click', deleteReview);
    }

    function loadReviews() {
        let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        reviews.forEach((review, index) => {
            addReviewToPage(review, index);
        });
    }

    function deleteReview(event) {
        const index = event.target.dataset.index;
        let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');

        reviews.splice(index, 1);

        localStorage.setItem('reviews', JSON.stringify(reviews));

        reviewsContainer.innerHTML = '';

        loadReviews();
    }
});