document.addEventListener('DOMContentLoaded', () => {
    const button_postArticle = document.getElementById('button_post');
    const button_delete = document.getElementById('button_delete');
    button_postArticle.addEventListener('click', () => {
        postNewArticle();
    });

    getAllArticles();
});
//this function contains all the
//other ones interface related
function showAllArticles(arts) {
    if (arts.length == 0) {
        showEmpty();
    } else {
        let table = document.getElementById('table_allPosts');
        let table_body = document.getElementById('tableBody_allPosts');
        let artsInHtml = '';
        arts.forEach((art) => {
            artsInHtml += createTableRow(art);
        });
        table_body.innerHTML = artsInHtml;
        table.classList.remove('hiddenElements');
        setTheEventsForEachRow();
    }
}

function createTableRow(art) {
    let table_rows = `
        <tr id="${art.id}">
            <td>${art.title}</td>
            <td>${showProperDateFormat(art.date)}</td>
        </tr>
    `;
    return table_rows;
}

function unselectRow(row, currentRow) {
    if (row == currentRow) {
        window.addEventListener('click', () => {});
    }
}

function setTheEventsForEachRow() {
    let allRows = document.querySelectorAll('tbody tr');
    let rowId = '';
    let articlesArea = document.querySelector('tbody');

    window.addEventListener('click', (e) => {
        let clickArea = e.target.parentNode.parentNode;
        if (clickArea != articlesArea) {
            let otherRow = document.querySelector('.row_selected');
            if (otherRow) {
                otherRow.classList.remove('row_selected');
                button_delete.classList.add('disabled');
                rowId = '';
            }
        }
    });
    allRows.forEach((row) => {
        row.addEventListener('click', (event) => {
            let clickedRow = event.target.parentNode;
            let otherRow = document.querySelector('.row_selected');
            if (otherRow) {
                otherRow.classList.remove('row_selected');
            }

            clickedRow.classList.add('row_selected');
            button_delete.classList.remove('disabled');
            rowId = clickedRow.id;
        });
    });

    button_delete.addEventListener('click', () => {
        if (rowId == '') {
            console.log('Please, select one article first.');
        } else {
            deleteExistingArticle(rowId);
        }
    });
}

//     window.addEventListener('click', (e) => {
//         let area = e.target.parentNode;
//         console.log(area);
//     });
// }

function showProperDateFormat(date) {
    let postDate = new Date(date);
    let today = new Date();
    let yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
    let fdate_postDate = postDate.toDateString();
    let fdate_today = today.toDateString();
    let fdate_yesterday = yesterday.toDateString();

    let hours = postDate.getHours();
    let minutes = postDate.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    let hour_and_minutes = `${hours}:${minutes}`;

    let result = '';
    if (fdate_postDate === fdate_today) {
        result = `Hoje às ${hour_and_minutes}`;
    } else if (fdate_postDate === fdate_yesterday) {
        result = `Ontem às ${hour_and_minutes}`;
    } else {
        result = `${postDate.toLocaleDateString()} às ${hour_and_minutes}`;
    }
    return result;
}

function showEmpty() {
    let card = document.getElementById('box_lastPosts-body');
    card.classList.add(
        'd-flex',
        'justify-content-center',
        'align-items-center',
        'min-height'
    );
    let message = document.createElement('h3');
    message.classList.add('text-muted');
    message.innerText = 'Sem artigos postados no momento.';
    card.appendChild(message);
}

function setCounter(info) {
    let counter = document.getElementById('data_postCounter');
    let STRING_POST;
    if (info == 1) {
        STRING_POST = 'Post';
    } else {
        STRING_POST = 'Posts';
    }
    counter.innerText = `${info} ${STRING_POST}`;
}
