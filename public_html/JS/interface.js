const SELECTED = 'row_selected';
let rowId = null;
let savedId = null;
let rowTitle = '';
let rowText = '';

document.addEventListener('DOMContentLoaded', () => {
    const box = getById('box_lastPosts-body');
    const box_table = getById('table_allPosts');
    const box_table_body = getById('tableBody_allPosts');
    const button_post = getById('button_post');
    const button_delete = getById('button_delete');
    const button_form_edit = getById('button_formEdit');
    const button_edit = getById('button_edit');

    // MODAL ELEMENTS
    const modal_post = getById('modalForPosts');
    const modal_edit = getById('modalForEdits');
    const inputTitle_post = getById('inputPost_title');
    const inputText_post = getById('inputPost_text');
    const inputTitle_edit = getById('inputEditedPost_title');
    const inputText_edit = getById('inputEditedPost_text');

    const alert_div = getById('my_alert');
    const alert_message = getById('alert_message');
    const alert_icon = getById('alert_icon');

    const HTML_obj = {
        box,
        b_table: box_table,
        b_tableBody: box_table_body,
        button_delete,
        button_formEdit: button_form_edit,
        alert_div,
        alert_message,
        alert_icon,
    };
    button_form_edit.addEventListener('click', () => {
        savedId = rowId;
    });
    window.addEventListener('click', (e) => {
        let clicked_area = e.target.parentNode.parentNode;
        let selected_row = document.querySelector('.' + SELECTED);
        if (clicked_area != box_table_body && selected_row) {
            selected_row.classList.remove(SELECTED);
            button_delete.classList.add('disabled');
            button_form_edit.classList.add('disabled');
            rowId = null;
        }
    });
    button_delete.addEventListener('click', () => {
        if (rowId == null) {
            console.log('Please select one article first.');
        } else {
            deleteArticle(rowId, HTML_obj);
        }
    });
    button_edit.addEventListener('click', () => {
        if (savedId == null) {
            console.log('Please select one article first.');
        } else {
            let input_newTitle = getById('inputEditedPost_title').value;
            let input_newText = getById('inputEditedPost_text').value;
            editArticle(HTML_obj, savedId, input_newTitle, input_newText);
        }
    });
    button_post.addEventListener('click', () => {
        let title = inputTitle_post.value;
        let text = inputText_post.value;
        inputTitle_post.value = '';
        inputText_post.value = '';
        postNewArticle(HTML_obj, title, text);
    });
    modal_post.addEventListener('shown.bs.modal', () => {
        inputTitle_post.focus();
    });
    modal_edit.addEventListener('shown.bs.modal', () => {
        inputTitle_edit.focus();
        inputTitle_edit.value = rowTitle;
        inputText_edit.value = rowText;
    });

    getAllArticles(HTML_obj);
});

function showRespectiveAlert(alert_case, alert_el, alert_message, alert_icon) {
    let alert_icon_type = alert_icon.firstChild;
    switch (alert_case) {
        case 'post success':
            alert_el.classList.remove('alert-danger');
            alert_el.classList.remove('alert-primary');
            alert_el.classList.add('alert-success');
            alert_icon_type.setAttribute(
                'xlink:href',
                '#exclamation-triangle-fill'
            );
            alert_message.innerText = 'Artigo postado com sucesso!';
            break;
        case 'post fail':
            alert_el.classList.remove('alert-success');
            alert_el.classList.remove('alert-primary');
            alert_el.classList.add('alert-danger');
            alert_icon_type.setAttribute(
                'xlink:href',
                '#exclamation-triangle-fill'
            );
            alert_message.innerText =
                'Falha ao postar o artigo. Tente novamente mais tarde.';
            break;
        case 'edit success':
            alert_el.classList.remove('alert-danger');
            alert_el.classList.remove('alert-success');
            alert_el.classList.add('alert-primary');
            alert_icon_type.setAttribute('xlink:href', '#check-circle-fill');
            alert_message.innerText = 'Artigo editado com sucesso!';
            break;
        case 'edit fail':
            alert_el.classList.remove('alert-success');
            alert_el.classList.remove('alert-primary');
            alert_el.classList.add('alert-danger');
            alert_icon_type.setAttribute(
                'xlink:href',
                '#exclamation-triangle-fill'
            );
            alert_message.innerText =
                'Falha ao editar o artigo. Tente novamente mais tarde.';
            break;
        case 'delete success':
            alert_el.classList.remove('alert-success');
            alert_el.classList.remove('alert-primary');
            alert_el.classList.add('alert-danger');
            alert_icon_type.setAttribute('xlink:href', '#check-circle-fill');
            alert_message.innerText = 'Artigo apagado permanentemente.';
            break;
        case 'delete fail':
            alert_el.classList.remove('alert-success');
            alert_el.classList.remove('alert-primary');
            alert_el.classList.add('alert-danger');
            alert_icon_type.setAttribute(
                'xlink:href',
                '#exclamation-triangle-fill'
            );
            alert_message.innerText =
                'Falha ao deletar o artigo. Tente novamente mais tarde.';
            break;
        default:
            alert_el.classList.add('alert-danger');
            alert_icon_type.setAttribute(
                'xlink:href',
                '#exclamation-triangle-fill'
            );
            alert_message.innerText =
                'Erro inesperado! Tente novamente mais tarde.';
            break;
    }

    alert_el.classList.remove('hidden');
    alert_el.classList.add('show');
    setTimeout(() => {
        alert_el.classList.remove('show');
        alert_el.classList.add('hidden');
    }, 2000);
}

//contains all the other functions interface related
function showAllArticles(arts, myHtml) {
    const counter = getById('data_postCounter');
    const noPosts_title = getById('noPosts_title');

    //returns 'post' or 'posts' string
    let string_post = setCounter(arts.length);

    /*defines what is going to be displayed based on
    if there is articles to show or not.*/
    let display_case = '';

    //shows to the clients the quantity of articles posted
    counter.innerText = `${arts.length} ${string_post}`;
    myHtml.b_tableBody.innerHTML = '';
    if (arts.length == 0) {
        display_case = 'no articles';
    }

    /*
    - shows a message informing if there's no articles
    posted, or either it shows the articles in a table;
    - sets events for each article, allowing to delete
    or edit the respective one. */
    setFinalDisplay(
        display_case,
        myHtml.box,
        myHtml.b_table,
        myHtml.b_tableBody,
        arts,
        noPosts_title,
        myHtml.button_delete,
        myHtml.button_formEdit
    );
}

function setFinalDisplay(
    cases,
    box,
    table,
    tbody,
    arts,
    title,
    button_edit,
    button_delete
) {
    switch (cases) {
        case 'no articles':
            table.classList.add('hiddenElements');
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
            if (title) {
                box.removeChild(title);
            }
            box.classList.remove(
                'd-flex',
                'justify-content-center',
                'align-items-center',
                'min-height'
            );

            arts.forEach((art) => {
                tbody.prepend(createTableRow(art, button_delete, button_edit));
            });

            table.classList.remove('hiddenElements');
    }
}

function createTableRow(art, b_delete, b_edit) {
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

        b_delete.classList.remove('disabled');
        b_edit.classList.remove('disabled');

        if (prev_row_selected) {
            prev_row_selected.classList.remove(SELECTED);
        }
        clicked_row.classList.add(SELECTED);
        rowId = clicked_row.id;
        rowTitle = art.title;
        rowText = art.text;
    });

    return tr;
}
