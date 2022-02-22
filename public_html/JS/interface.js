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
    }
}

function createTableRow(art) {
    // let table = document.getElementById('table_allPosts');
    // let table_body = document.getElementById('tableBody_allPosts');
    let table_rows = `<tr><td>${art.title}</td></tr>`;
    return table_rows;
    // table_body.innerHTML += table_rows;
    // table.classList.remove('hiddenElements');
}

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
