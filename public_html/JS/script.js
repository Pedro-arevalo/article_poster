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
    let titleInput = document.getElementById('inputPost_title').value;
    let textInput = document.getElementById('inputPost_text').value;
    let newPost = {
        title: titleInput,
        text: textInput,
    };
    let options = {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(newPost),
    };
    fetch(URL_POST, options)
        .then((res) => {
            if (res.ok) {
                console.log(res);
                getAllArticles();
            } else {
                throw new Error('Something went wrong');
            }

            document.getElementById('inputPost_title').value = '';
            document.getElementById('inputPost_text').value = '';
        })
        .catch((error) => {
            console.log(error.message);
        });
}
