document.addEventListener('DOMContentLoaded', () => {
    const button_postArticle = document.getElementById('button_post');
    button_postArticle.addEventListener('click', () => {
        postNewArticle();
    });
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

function postNewArticle() {
    let title = document.getElementById('inputPost_title').value;
    let text = document.getElementById('inputPost_text').value;
    let time = new Date();

    let article = { title, text, time };

    let options = {
        method: 'POST',
        'Content-Type': 'application/json',
    };
    fetch('http://localhost:5000/api/new', options);
}
