function showEmpty() {
    let card = document.getElementById('box_lastPosts-body');
    card.classList.add(
        'd-flex',
        'justify-content-center',
        'align-items-center'
    );
    let message = document.createElement('h3');
    message.classList.add('text-muted');
    message.innerText = 'Sem artigos postados no momento.';
    card.appendChild(message);
}
function createTableRow(art) {
    let table = document.getElementById('table_allPosts');
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.innerHTML = art.title;
    td.classList.add('data_tableRow');
    tr.appendChild(td);
    table.appendChild(tr);
    table.classList.remove('hiddenElements');
}

function showAllArticles(arts) {
    // arts.splice(0, 1);
    if (arts.length == 0) {
        showEmpty();
    } else {
        arts.forEach((art) => {
            createTableRow(art);
        });
    }
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
