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
    let raw_postDate = new Date(art.date);
    let postDate = raw_postDate.toLocaleString();
    // let table = document.getElementById('table_allPosts');
    // let table_body = document.getElementById('tableBody_allPosts');
    let table_rows = `
        <tr>
            <td>${art.title}</td>
            <td>${showProperDateFormat(art.date)}</td>
        </tr>
    `;
    return table_rows;
    // table_body.innerHTML += table_rows;
    // table.classList.remove('hiddenElements');
}

function showProperDateFormat(date) {
    let postDate = new Date(date);
    let today = new Date();
    let yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
    let fdate_postDate = postDate.toDateString();
    let fdate_today = today.toDateString();
    let fdate_yesterday = yesterday.toDateString();

    console.log(fdate_yesterday);
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
