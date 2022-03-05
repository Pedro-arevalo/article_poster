const SELECTED = 'row_selected';
let rowId = null;

document.addEventListener('DOMContentLoaded', () => {
    const box = getById('box_lastPosts-body');
    const box_table = getById('table_allPosts');
    const box_table_body = getById('tableBody_allPosts');
    const button_post = getById('button_post');
    const button_delete = getById('button_delete');
    const button_edit = getById('button_edit');
    const HTML_obj = {
        box,
        b_table: box_table,
        b_tableBody: box_table_body,
        button_delete,
        button_edit,
    };

    window.addEventListener('click', (e) => {
        let clicked_area = e.target.parentNode.parentNode;
        let selected_row = document.querySelector('.' + SELECTED);
        if (clicked_area != box_table_body && selected_row) {
            selected_row.classList.remove(SELECTED);
            button_delete.classList.add('disabled');
            button_edit.classList.add('disabled');
            rowId = null;
        }
    });
    button_post.addEventListener('click', () => {
        postNewArticle(HTML_obj);
    });
    button_delete.addEventListener('click', () => {
        edAndDel_events(deleteArticle, HTML_obj);
    });
    button_edit.addEventListener('click', () => {
        edAndDel_events(editArticle, HTML_obj);
    });

    getAllArticles(HTML_obj);
});

function edAndDel_events(action, html) {
    if (rowId == null) {
        console.log('Please select one article first.');
    } else {
        action(rowId, html);
    }
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
        myHtml.button_edit
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
                tbody.appendChild(
                    createTableRow(art, button_delete, button_edit)
                );
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
    });

    return tr;
}
