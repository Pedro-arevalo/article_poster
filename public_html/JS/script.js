const URL_POST = 'http://localhost:5000/api/new';
const URL_GET = 'http://localhost:5000/api/all';

document.addEventListener('DOMContentLoaded', () => {
    const button_postArticle = document.getElementById('button_post');
    button_postArticle.addEventListener('click', () => {
        postNewArticle();
    });
    getAllArticles();
});

function getAllArticles() {
    fetch(URL_GET)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error();
            }
        })
        .then((articles) => {
            showAllArticles(articles);
            setCounter(articles.length);
        })
        .catch((error) => {
            console.log(error.message);
        });
}

function postNewArticle() {
    let newPost = {
        title: document.getElementById('inputPost_title').value,
        text: document.getElementById('inputPost_text').value,
    };
    let options = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(newPost),
    };
    fetch('http://localhost:5000/api/new', options).then((res) => {
        console.log(res);
    });
}
