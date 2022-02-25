const URL_POST = 'http://localhost:5000/api/new';
const URL_GET = 'http://localhost:5000/api/all';
const URL_PUT = 'http://localhost:5000/api/update';
const URL_DELETE = 'http://localhost:5000/api/del';

document.addEventListener('DOMContentLoaded', () => {
    const button_postArticle = document.getElementById('button_post');
    //button_editArticle only for testing purposes for now.
    const button_editArticle = document.getElementById('button_edit');
    //button_deleteArticle only for testing purposes for now.
    const button_deleteArticle = document.getElementById('button_delete');
    button_postArticle.addEventListener('click', () => {
        postNewArticle();
    });
    button_editArticle.addEventListener('click', () => {
        editExistingArticle();
    });
    button_deleteArticle.addEventListener('click', () => {
        deleteExistingArticle();
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

function editExistingArticle() {
    let newPostEdit = {
        id: 2,
        changes: {
            title: 'The truth about her is that...',
            text: 'My new edited text',
        },
    };

    let options = {
        method: 'PUT',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(newPostEdit),
    };

    fetch(URL_PUT, options)
        .then((res) => {
            if (res.ok) {
                getAllArticles();
            } else {
                throw new Error('Something went wrong');
            }
        })
        .catch((error) => {
            console.log(error.message);
        });
}

function deleteExistingArticle() {
    let options = {
        method: 'DELETE',
    };
    fetch(URL_DELETE, options)
        .then((res) => {
            if (res.ok) {
                console.log(res);
                getAllArticles();
            } else {
                throw new Error('Something went wrong');
            }
        })
        .catch((error) => {
            console.log(error.message);
        });
}
