const express = require('express');
const mySystem = require('../model/posts');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/all', (req, res) => {
    res.json(mySystem.showAllPosts());
});

router.post('/new', (req, res) => {
    console.log(req.headers);
    console.log('=======================================');
    console.log(req.method);
    console.log('=======================================');
    console.log(req.body);
    let incomingReq = req.body;
    mySystem.addNewPost({
        title: incomingReq.title,
        text: incomingReq.text,
    });
    res.send('Article successfully posted.');
});

module.exports = router;
