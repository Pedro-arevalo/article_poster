const URL_POST = 'http://localhost:5000/api/new';
const URL_GET = 'http://localhost:5000/api/all';
const URL_PUT = 'http://localhost:5000/api/update';
const URL_DELETE = 'http://localhost:5000/api/del';

function getAllArticles(html) {
    fetch(URL_GET)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error();
            }
        })
        .then((articles) => {
            showAllArticles(articles, html);
        })
        .catch((error) => {
            console.log(error);
        });
}

function postNewArticle(html) {
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
<<<<<<< HEAD
                showSuccessAlert('alert_postSuccess');
                getAllArticles(interface_els_obj);
=======
                getAllArticles(html);
>>>>>>> parent of c25cd97 (improved the style in the forms; added bootstrap alerts for ui/ux purposes)
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

function editArticle(postId, html) {
    let newPostEdit = {
        id: postId,
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
<<<<<<< HEAD
                showSuccessAlert('alert_editSuccess');
                getAllArticles(interface_els_obj);
=======
                getAllArticles(html);
>>>>>>> parent of c25cd97 (improved the style in the forms; added bootstrap alerts for ui/ux purposes)
            } else {
                throw new Error('Something went wrong');
            }
        })
        .catch((error) => {
            console.log(error.message);
        });
}

function deleteArticle(articleId, html) {
    let options = {
        method: 'DELETE',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ id: articleId }),
    };
    fetch(URL_DELETE, options)
        .then((res) => {
            if (res.ok) {
                showSuccessAlert('alert_deleteSuccess');
                getAllArticles(html);
            } else {
                throw new Error('Something went wrong');
            }
        })
        .catch((error) => {
            console.log(error.message);
        });
}
