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

function postNewArticle(interface_els_obj, title, text) {
    let newPost = { title, text };
    let options = {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(newPost),
    };
    fetch(URL_POST, options)
        .then((res) => {
            let alert_div = interface_els_obj.alert_div;
            let alert_message = interface_els_obj.alert_message;
            let alert_icon = interface_els_obj.alert_icon;
            if (res.ok) {
                showRespectiveAlert(
                    'post success',
                    alert_div,
                    alert_message,
                    alert_icon
                );
                getAllArticles(interface_els_obj);
            } else {
                showRespectiveAlert('post fail', alert_div, alert_message);
                throw new Error('Something went wrong');
            }

            document.getElementById('inputPost_title').value = '';
            document.getElementById('inputPost_text').value = '';
        })
        .catch((error) => {
            console.log(error.message);
        });
}

function editArticle(interface_els_obj, postId, newTitle, newText) {
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
            let alert_div = interface_els_obj.alert_div;
            let alert_message = interface_els_obj.alert_message;
            let alert_icon = interface_els_obj.alert_icon;
            if (res.ok) {
                showRespectiveAlert(
                    'edit success',
                    alert_div,
                    alert_message,
                    alert_icon
                );
                getAllArticles(interface_els_obj);
            } else {
                showRespectiveAlert('edit fail', alert_div, alert_message);
                throw new Error('Something went wrong');
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteArticle(articleId, interface_els_obj) {
    let options = {
        method: 'DELETE',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ id: articleId }),
    };
    fetch(URL_DELETE, options)
        .then((res) => {
            let alert_div = interface_els_obj.alert_div;
            let alert_message = interface_els_obj.alert_message;
            let alert_icon = interface_els_obj.alert_icon;
            if (res.ok) {
                showRespectiveAlert(
                    'delete success',
                    alert_div,
                    alert_message,
                    alert_icon
                );
                getAllArticles(interface_els_obj);
            } else {
                showRespectiveAlert('delete fail', alert_div, alert_message);
                throw new Error('Something went wrong');
            }
        })
        .catch((error) => {
            console.log(error.message);
        });
}
