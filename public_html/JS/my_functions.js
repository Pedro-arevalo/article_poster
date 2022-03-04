function createEl(el) {
    let newElement = document.createElement(el);
    return newElement;
}
function formatDate(date) {
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
function setCounter(length) {
    let STRING_POST;
    if (length == 1) {
        STRING_POST = 'Post';
    } else {
        STRING_POST = 'Posts';
    }
    return STRING_POST;
}
