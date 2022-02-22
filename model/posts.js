const mySystem = {
    posts: [
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
        {
            title: 'My third Post',
            text: 'Hi how are you?',
            time: 'Here shows the time the article was posted',
        },
        {
            title: 'My fourth Post',
            text: 'Hi how are you?',
            time: 'Here shows the time the article was posted',
        },
    ],
    showAllPosts() {
        return this.posts;
    },
    addNewPost(newPost) {
        this.posts.push(newPost);
    },
};

module.exports = mySystem;
