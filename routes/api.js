const express = require('express');
const mySystem = require('../model/posts');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/all', (req, res) => {
    res.json(mySystem.showAllPosts());
});

router.post('/new', (req, res) => {
    console.log(`====== NEW ${req.method} REQUEST ======`);
    console.log(req.headers);
    console.log('=======================================');
    console.log(req.body);
    let newPost = req.body;
    mySystem.addNewPost({
        title: newPost.title,
        text: newPost.text,
    });
    res.send('Article successfully posted.');
});

router.put('/update', (req, res) => {
    console.log(`====== NEW ${req.method} REQUEST ======`);
    console.log(req.headers);
    console.log('=======================================');
    console.log(req.body);
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

router.delete('/del', (req, res) => {
    console.log(`====== NEW ${req.method} REQUEST ======`);
    console.log(req.headers);
    console.log('=======================================');
    console.log(req.body);

    //There's code remaining, it is like this because of testing.
    let postId = 1;
    mySystem.deleteExistingPost(postId);
    res.send('Article permanently deleted.');
});

module.exports = router;
