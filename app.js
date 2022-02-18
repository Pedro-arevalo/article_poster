const express = require('express');
const path = require('path');
const PORT = 5000;
const app = express();

const ARTICLES = [
    //the articles that i manually put here, for testing purposes,
    //must be a string in JSON
    {
        title: 'Hello World',
        text: 'This is my first article post',
        time: 'Here shows the time the article was posted',
    },
    {
        title: 'My second Post',
        text: 'Hi how are you?',
        time: 'Here shows the time the article was posted',
    },
];

app.use(express.static(path.join(__dirname, 'public_html')));

app.get('/api/all', (req, res) => {
    res.send(JSON.stringify(ARTICLES));
});

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server running successfully on port ${PORT}`);
    }
});
