document.addEventListener('DOMContentLoaded', () => {
    const button_postArticle = document.getElementById('button_post');
    const button_delete = document.getElementById('button_delete');
    const button_edit = document.getElementById('button_edit');
    let occupated_before = false;
    button_postArticle.addEventListener('click', () => {
        postNewArticle();
    });
    getAllArticles();
});
//this function contains all the
//other ones interface related
let last_time_empty = false;
function showAllArticles(arts) {
    let table = document.getElementById('table_allPosts');
    let table_body = document.getElementById('tableBody_allPosts');
    let box = document.getElementById('box_lastPosts-body');
    const counter = document.getElementById('data_postCounter');
    let noPosts_title = document.querySelector('#box_lastPosts-body h3');
    let string_post = setCounter(arts.length); //return 'post' or 'posts' string
    counter.innerText = `${arts.length} ${string_post}`;
    table_body.innerHTML = '';

    if (arts.length == 0) {
        //DOES NOT HAS ARTICLES
        //SET ENVIRONMENT
        table.classList.add('hiddenElements');

        //SHOW EMPTY TABLE
        box.classList.add(
            'd-flex',
            'justify-content-center',
            'align-items-center',
            'min-height'
        );
        let mes = document.querySelector('#box_lastPosts-body h3');
        console.log(mes);
        console.log('new', noPosts_title);
        if (!mes) {
            let message = createEl('h3');
            message.classList.add('text-muted');
            message.innerText = 'Sem artigos postados no momento.';
            box.appendChild(message);
            last_time_empty = true;
        }
    } else {
        //HAS ARTICLES
        //SET ENVIRONMENT
        let message = document.querySelector('#box_lastPosts-body h3');
        console.log(message);
        console.log('new', noPosts_title);
        if (message) {
            box.removeChild(message);
        }

        box.classList.remove(
            'd-flex',
            'justify-content-center',
            'align-items-center',
            'min-height'
        );

        //SHOW ARTICLES IN TABLE
        arts.forEach((art) => {
            table_body.appendChild(createTableRow(art));
        });
        table.classList.remove('hiddenElements');
        setTheEventsForEachRow();
    }
}
function showEmpty() {}

function createTableRow(art) {
    let tr = createEl('tr');
    let td_title = createEl('td');
    let td_date = createEl('td');
    tr.id = art.id;

    td_title.innerText = art.title;
    td_date.innerText = formatDate(art.date);

    tr.appendChild(td_title);
    tr.appendChild(td_date);
    return tr;
}

function setTheEventsForEachRow() {
    let allRows = document.querySelectorAll('tbody tr');
    let lastRowId = null;
    let articlesArea = document.querySelector('tbody');

    window.addEventListener('click', (e) => {
        //UNSELECT SELECTED TR (ARTICLES)
        let clickArea = e.target.parentNode.parentNode;
        if (clickArea != articlesArea) {
            let otherRow = document.querySelector('.row_selected');
            if (otherRow) {
                otherRow.classList.remove('row_selected');
                button_delete.classList.add('disabled');
                button_edit.classList.add('disabled');
                rowId = null;
            }
        }
    });

    allRows.forEach((row) => {
        row.addEventListener('click', (event) => {
            //SELECT TR (ARTICLE)
            let clickedRow = event.target.parentNode;
            let otherRow = document.querySelector('.row_selected');
            if (otherRow) {
                otherRow.classList.remove('row_selected');
            }

            clickedRow.classList.add('row_selected');
            button_delete.classList.remove('disabled');
            button_edit.classList.remove('disabled');
            rowId = clickedRow.id;
        });
    });

    button_delete.addEventListener('click', () => {
        if (rowId == null) {
            console.log('Please, select one article first.');
        } else {
            deleteExistingArticle(rowId);
        }
    });

    button_edit.addEventListener('click', () => {
        if (rowId == null) {
            console.log('Please, select one article first');
        } else {
            editExistingArticle(rowId);
        }
    });
}
