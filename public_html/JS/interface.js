const SELECTED = 'row_selected';
let rowId = null;
let rowTitle = '';
let rowText = '';
let savedId = null;

document.addEventListener('DOMContentLoaded', () => {
    const box = getById('box_lastPosts-body');
    const box_table = getById('table_allPosts');
    const box_table_body = getById('tableBody_allPosts');
    const button_post = getById('button_post');
    const button_delete = getById('button_delete');
    const button_formEdit = getById('button_formEdit');
    const button_edit = getById('button_edit');

    const modal_post = getById('modalForPosts');
    const modal_edit = getById('modalForEdits');
    const inputTitle_post = getById('inputPost_title');
    const inputText_post = getById('inputPost_text');
    const inputTitle_edit = getById('inputEditedPost_title');
    const inputText_edit = getById('inputEditedPost_text');

    const HTML_obj = {
        box,
        b_table: box_table,
        b_tableBody: box_table_body,
        button_delete,
        button_formEdit,
    };
    button_formEdit.addEventListener('click', () => {
        savedId = rowId;
    });
    window.addEventListener('click', (e) => {
        let clicked_area = e.target.parentNode.parentNode;
        let selected_row = document.querySelector('.' + SELECTED);
        if (clicked_area != box_table_body && selected_row) {
            selected_row.classList.remove(SELECTED);
            button_delete.classList.add('disabled');
            button_formEdit.classList.add('disabled');
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

    inputTitle_post.value = '';
    inputText_post.value = '';
    inputTitle_edit.value = '';
    inputText_edit.value = '';

    getAllArticles(HTML_obj);
});

function showSuccessAlert(alert_id) {
    setTimeout(() => {
        const alert = getById(alert_id);
        alert.classList.add('show');
        alert.classList.remove('hidden');
        setTimeout(() => {
            alert.classList.remove('show');
            alert.classList.add('hidden');
        }, 2000);
    }, 300);
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
    button_formEdit,
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
            tbody.classList.add('accordion');

            arts.forEach((art) => {
                let collapse_id = 'collapse_' + art.id;

                tbody.appendChild(
                    createRows(art, button_delete, button_edit, collapse_id)
                );
            });

            table.classList.remove('hiddenElements');
            console.log(table.outerHTML);
    }
}

function createRows(art, b_delete, b_edit, collapse_id) {
    let accordion_item = createEl('div');
    accordion_item.classList.add('accordion-item');

    accordion_item.appendChild(
        createTableRow(art, b_delete, b_edit, collapse_id)
    );
    accordion_item.appendChild(createAdditionalCollapseRow(art, collapse_id));

    return accordion_item;
}

function createTableRow(art, b_delete, b_edit, collapse_id) {
    let tr = createEl('tr');
    let td_title = createEl('td');
    let td_date = createEl('td');
    tr.setAttribute('id', art.id);
    tr.classList.add('header_tr', 'accordion-header');
    tr.setAttribute('data-bs-toggle', 'collapse');
    tr.setAttribute('data-bs-target', '#' + collapse_id);
    tr.setAttribute('aria-expanded', 'false');
    tr.setAttribute('aria-controls', collapse_id);

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

function createAdditionalCollapseRow(art, id) {
    let tr = createEl('tr');
    let td = createEl('td');
    let div = createEl('div');
    let inner_div = createEl('div');

    td.setAttribute('colspan', 2);
    td.style.padding = 0;

    div.setAttribute('id', id);
    div.classList.add('accordion-collapse', 'collapse');
    div.setAttribute('data-bs-parent', '#tableBody_allPosts');

    inner_div.innerText = art.text;

    div.appendChild(inner_div);
    td.appendChild(div);
    tr.appendChild(td);

    return tr;
}
