const SELECTED = 'row_selected';
let rowId = null;
let savedId = null;
let rowTitle = '';
let rowText = '';
let show_content_after_cancel_delete = false;

document.addEventListener('DOMContentLoaded', () => {
    const button_pre_delete = getById('button_pre_delete'); //button that opens a modal for delete confirmation
    const button_cancel_delete = getById('button_cancel_delete'); //button that cancels the article delete
    const button_delete = getById('button_delete'); //button that sends the request to delete the article
    const button_form_edit = getById('button_formEdit'); //button that opens a form to set the changes in the article
    const button_edit = getById('button_edit'); //button that sends the request to edit the article
    const button_post = getById('button_post'); //button that sends the request to post the article

    // MODAL ELEMENTS
    //  - ARTICLE CONTENT MODAL
    const modal_art_content = getById('modal_articleContent');
    const modal_button_pre_delete = getById('modal_button_pre_delete');

    //  - POST MODAL
    const modal_post = getById('modalForPosts');
    const inputTitle_post = getById('inputPost_title');
    const inputText_post = getById('inputPost_text');

    //  - EDIT MODAL
    const modal_edit = getById('modalForEdits');
    const inputTitle_edit = getById('inputEditedPost_title');
    const inputText_edit = getById('inputEditedPost_text');

    //  - DELETE MODAL
    const modal_delete = getById('modalForDeletes');
    const modal_delete_articleTitle = getById('modal_delete_articleTitle');

    inputTitle_post.value = '';
    inputText_post.value = '';

    window.addEventListener('click', (e) => {
        const box_table_body = getById('tableBody_allPosts');
        let clicked_area = e.target.parentNode.parentNode;
        let selected_row = document.querySelector('.' + SELECTED);
        if (clicked_area != box_table_body && selected_row) {
            selected_row.classList.remove(SELECTED);
            button_pre_delete.classList.add('disabled');
            button_form_edit.classList.add('disabled');
            rowId = null;
        }
    });

    button_pre_delete.addEventListener('click', () => {
        savedId = rowId;
    });

    modal_button_pre_delete.addEventListener('click', () => {
        show_content_after_cancel_delete = true;
    });

    modal_delete.addEventListener('show.bs.modal', () => {
        modal_delete_articleTitle.innerText = rowTitle;
    });

    button_cancel_delete.addEventListener('click', () => {
        if (show_content_after_cancel_delete === true) {
            let modal_content = new bootstrap.Modal(modal_art_content, {
                keyboard: false,
            });
            modal_content.show();

            show_content_after_cancel_delete = false;
        }
    });

    button_delete.addEventListener('click', () => {
        if (savedId == null) {
            console.log('Please select one article first.');
        } else {
            deleteArticle(savedId);
        }
    });
    button_form_edit.addEventListener('click', () => {
        savedId = rowId;
    });
    button_edit.addEventListener('click', () => {
        if (savedId == null) {
            console.log('Please select one article first.');
        } else {
            let input_newTitle = getById('inputEditedPost_title').value;
            let input_newText = getById('inputEditedPost_text').value;
            editArticle(savedId, input_newTitle, input_newText);
        }
    });

    button_post.addEventListener('click', () => {
        let title = inputTitle_post.value;
        let text = inputText_post.value;
        inputTitle_post.value = '';
        inputText_post.value = '';
        postNewArticle(title, text);
    });

    modal_post.addEventListener('shown.bs.modal', () => {
        inputTitle_post.focus();
    });

    modal_post.addEventListener('hidden.bs.modal', () => {
        inputTitle_post.value = '';
        inputText_post.value = '';
    });
    modal_edit.addEventListener('show.bs.modal', () => {
        inputTitle_edit.value = rowTitle;
        inputText_edit.value = rowText;
    });
    modal_edit.addEventListener('shown.bs.modal', () => {
        inputTitle_edit.focus();
    });

    getAllArticles();
});

//contains all the other functions interface related
function showAllArticles(arts) {
    const box_tableBody = getById('tableBody_allPosts');
    const counter = getById('data_postCounter');

    //returns 'post' or 'posts' string
    let string_post = setCounter(arts.length);

    /*defines what is going to be displayed based on
    if there is articles to show or not.*/
    let display_case = '';

    //shows to the clients the quantity of articles posted
    counter.innerText = `${arts.length} ${string_post}`;
    box_tableBody.innerHTML = '';
    if (arts.length == 0) {
        display_case = 'no articles';
    }

    /*
    - shows a message informing if there's no articles
    posted, or either it shows the articles in a table;
    - sets events for each article, allowing to delete
    or edit the respective one. */
    setFinalDisplay(display_case, arts);
}

function setFinalDisplay(cases, arts) {
    let box = getById('box_lastPosts-body');
    let box_table = getById('table_allPosts');
    let box_table_body = getById('tableBody_allPosts');
    let no_posts_title = getById('noPosts_title');
    switch (cases) {
        case 'no articles':
            box_table.classList.add('hiddenElements');
            box.classList.add(
                'd-flex',
                'justify-content-center',
                'align-items-center',
                'min-height'
            );
            let message = createEl('h3');
            message.id = 'noPosts_title';
            message.classList.add('text-muted');
            message.innerText = 'Sem artigos postados no momento.';
            box.appendChild(message);
            break;

        default:
            //there is at least one article
            if (no_posts_title) {
                box.removeChild(no_posts_title);
            }
            box.classList.remove(
                'd-flex',
                'justify-content-center',
                'align-items-center',
                'min-height'
            );

            arts.forEach((art) => {
                box_table_body.prepend(createTableRow(art));
            });

            box_table.classList.remove('hiddenElements');
    }
}

function createTableRow(art) {
    let pre_delete_button = getById('button_pre_delete');
    let form_edit_button = getById('button_formEdit');

    let tr = createEl('tr');
    let td_title = createEl('td');
    let td_date = createEl('td');
    tr.id = art.id;

    td_title.innerText = art.title;
    td_date.innerText = formatDate(art.date);

    tr.appendChild(td_title);
    tr.appendChild(td_date);

    tr.addEventListener('click', (event) => {
        let clicked_row = event.target.parentNode;
        let prev_row_selected = document.querySelector('.' + SELECTED);

        pre_delete_button.classList.remove('disabled');
        form_edit_button.classList.remove('disabled');

        if (prev_row_selected) {
            prev_row_selected.classList.remove(SELECTED);
        }
        clicked_row.classList.add(SELECTED);
        rowId = clicked_row.id;
        rowTitle = art.title;
        rowText = art.text;

        console.log(rowId);
    });
    tr.addEventListener('dblclick', () => {
        pre_delete_button.classList.add('disabled');
        form_edit_button.classList.add('disabled');
        savedId = rowId;
        let article_content = new bootstrap.Modal(
            getById('modal_articleContent'),
            {
                keyboard: false,
            }
        );
        let modal_title = getById('articleTitle');
        let modal_text = getById('articleText');

        modal_title.innerText = art.title;
        modal_text.innerText = art.text;

        article_content.show();
    });

    return tr;
}

function showRespectiveAlert(alert_case) {
    let alert_el = getById('my_alert');
    let bs_alert_color = '';
    let message = '';
    let icon = '';
    switch (alert_case) {
        case 'post success':
            bs_alert_color = 'alert-success';
            message = 'Novo artigo postado!';
            icon = '#check-circle-fill';
            break;
        case 'post fail':
            bs_alert_color = 'alert-danger';
            message = 'Falha ao postar o artigo. Tente novamente mais tarde.';
            icon = '#exclamation-triangle-fill';
            break;
        case 'edit success':
            bs_alert_color = 'alert-primary';
            message = 'Artigo editado com sucesso!';
            icon = '#check-circle-fill';
            break;
        case 'edit fail':
            bs_alert_color = 'alert-danger';
            message = 'Falha ao editar o artigo. Tente novamente mais tarde.';
            icon = '#exclamation-triangle-fill';
            break;
        case 'delete success':
            bs_alert_color = 'alert-danger';
            message = 'Artigo deletado!';
            icon = '#check-circle-fill';
            break;
        case 'delete fail':
            bs_alert_color = 'alert-danger';
            message = 'Falha ao deletar o artigo. Tente novamente mais tarde.';
            icon = '#exclamation-triangle-fill';
            break;
        default:
            bs_alert_color = 'alert-danger';
            message = 'Erro inesperado! Tente novamente mais tarde.';
            icon = '#exclamation-triangle-fill';
    }

    setCurrentAlert(bs_alert_color, message, icon);
    alert_el.classList.remove('hidden');
    alert_el.classList.add('show');
    setTimeout(() => {
        alert_el.classList.remove('show');
        alert_el.classList.add('hidden');
    }, 2000);
}

function setCurrentAlert(bs_color, message, icon) {
    let el = getById('my_alert');
    let icon_el = getById('alert_icon').firstChild;
    let mes_div = getById('alert_message');

    let all_colors = ['alert-success', 'alert-primary', 'alert-danger'];
    let other_colors = [];

    all_colors.forEach((color) => {
        if (color != bs_color) other_colors.push(color);
    });
    el.classList.remove(other_colors[0], other_colors[1]);
    el.classList.add(bs_color);

    icon_el.setAttribute('xlink:href', icon);
    mes_div.innerText = message;
}
