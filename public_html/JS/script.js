document.addEventListener('DOMContentLoaded', () => {
    getAllArticles();
});

function getAllArticles() {
    fetch('http://localhost:5000/api/all')
        .then((res) => {
            return res.json();
        })
        .then((articles) => {
            showAllArticles(articles);
            setCounter(articles.length);
        });
}
