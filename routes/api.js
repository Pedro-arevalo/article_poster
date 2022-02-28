const express = require('express');
const mySystem = require('../model/posts');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

function showServerActivity(req, res, next) {
    console.log(`====== NEW ${req.method} REQUEST ======`);
    console.log(req.headers);
    console.log('=======================================');
    console.log(req.body);
    next();
}

router.get('/all', (req, res, next) => {
    showServerActivity(req, res, next);
    res.json(mySystem.showAllPosts());
});

router.post('/new', (req, res, next) => {
    showServerActivity(req, res, next);
    let newPost = req.body;
    mySystem.addNewPost(newPost);
    res.send('Article successfully posted.');
});

router.put('/update', (req, res, next) => {
    showServerActivity(req, res, next);
    /* INCOMING REQUISITION:
        
    {
        id: dkgjlgaijga,
        changes: {
            title: 'Hello World',
            text: 'My new text of the post',
        }
    }
    
    */

    let postId = req.body.id;
    let newPostUpdate = req.body.changes;

    mySystem.updateExistingPost(newPostUpdate, postId);
    res.send('Article successfully edited.');
});

router.delete('/del', (req, res, next) => {
    showServerActivity(req, res, next);
    //There's code remaining, it is like this because of testing.
    postId = req.body.id;
    mySystem.deleteExistingPost(postId);
    res.send('Article permanently deleted.');
});

module.exports = router;
