const URL_POST = 'http://localhost:5000/api/new';
const URL_GET = 'http://localhost:5000/api/all';
const URL_PUT = 'http://localhost:5000/api/update';
const URL_DELETE = 'http://localhost:5000/api/del';

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
        })
        .catch((error) => {
            console.log(error);
        });
}

function postNewArticle(title, text) {
    let newPost = { title, text };
    let options = {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(newPost),
    };
    fetch(URL_POST, options)
        .then((res) => {
            if (res.ok) {
                //displays an alert for when the request succeded
                showRespectiveAlert('post success');
                /*given there's a change in the server data, the displayed
                table would be outdated, that's why this function has to
                be called in order to asynchoronouslly call the current
                state of the server data in order to allways mantain the
                frontend updated*/
                getAllArticles();
            } else {
                //displays an alert for when the request failed
                showRespectiveAlert('post fail');
                throw new Error('Something went wrong');
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function editArticle(postId, newTitle, newText) {
    console.log(postId);
    console.log(newTitle);
    console.log(newText);
    let newPostEdit = {
        id: postId,
        changes: {
            title: newTitle,
            text: newText,
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
                //displays an alert for when the request succeded
                showRespectiveAlert('edit success');

                /*given there's a change in the server data, the displayed
                table would be outdated, that's why this function has to
                be called in order to asynchoronouslly call the current
                state of the server data in order to allways mantain the
                frontend updated*/
                getAllArticles();
            } else {
                //displays an alert for when the request failed
                showRespectiveAlert('edit fail');
                throw new Error('Something went wrong');
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteArticle(articleId) {
    let options = {
        method: 'DELETE',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ id: articleId }),
    };
    fetch(URL_DELETE, options)
        .then((res) => {
            if (res.ok) {
                //displays an alert for when the request succeded
                showRespectiveAlert('delete success');
                /*given there's a change in the server data, the displayed
                table would be outdated, that's why this function has to
                be called in order to asynchoronouslly call the current
                state of the server data in order to allways mantain the
                frontend updated*/
                getAllArticles();
            } else {
                //displays an alert for when the request failed
                showRespectiveAlert('delete fail');
                throw new Error('Something went wrong');
            }
        })
        .catch((error) => {
            console.log(error.message);
        });
}
