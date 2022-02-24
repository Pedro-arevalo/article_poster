const mySystem = {
    posts: [
        //the articles that i manually put here, for testing purposes,
        //must be a string in JSON
        {
            title: 'Hello World',
            text: 'This is my first article post',
            time: 'Here shows the time the article was posted',
            id: 0,
        },
        {
            title: 'I am right here',
            text: 'Hi how are you?',
            time: 'Here shows the time the article was posted',
            id: 1,
        },
        {
            title: 'Look at me!',
            text: 'Hi how are you?',
            time: 'Here shows the time the article was posted',
            id: 2,
        },
        {
            title: 'Do you know me?',
            text: 'Hi how are you?',
            time: 'Here shows the time the article was posted',
            id: 3,
        },
    ],
    showAllPosts() {
        return this.posts;
    },
    addNewPost(newPost) {
        this.posts.push(newPost);
    },
    updateExistingPost(newUpdate, postId) {
        this.posts.forEach((post) => {
            if (post.id == postId) {
                post.title = newUpdate.title;
                post.text = newUpdate.text;
            }
        });
    },
    deleteExistingPost(postId) {
        this.posts.forEach((post) => {
            if (post.id == postId) {
                let i = this.posts.indexOf(post);
                this.posts.splice(i, 1);
            }
        });
    },
};

module.exports = mySystem;
