const mySystem = {
    posts: [
        {
            id: 'm3LpVa3LGn1nfTWKJvnSiv38w',
            title: 'Hello World',
            text: 'This is my first article post',
            date: new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * 5),
        },
        {
            id: '5TT8onqqt8rbxBUjl2G3r1qbg',
            title: 'I am right here',
            text: 'Hi how are you?',
            date: new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * 2),
        },
        {
            id: 'uRKsaNkg3ISzSRldhZRd9XrPF',
            title: 'Look at me!',
            text: 'Hi how are you?',
            date: new Date(new Date().valueOf() - 1000 * 60 * 60 * 24),
        },
        {
            id: 'Cvnq67Tse0ogw94zbtvMjFhVs',
            title: 'Do you know me?',
            text: 'Hi how are you?',
            date: new Date(),
        },
    ],
    showAllPosts() {
        return this.posts;
    },
    addNewPost(newPost) {
        let dateOfPost = new Date();
        this.posts.push({
            id: generateId(),
            title: newPost.title,
            text: newPost.text,
            date: dateOfPost,
        });
    },
    updateExistingPost(newUpdate, postId) {
        let dateOfEditing = new Date();
        this.posts.forEach((post) => {
            if (post.id == postId) {
                post.title = newUpdate.title;
                post.text = newUpdate.text;
                post.date_lastEdit = dateOfEditing;
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

function generateId() {
    let result = '';
    let characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 25; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return result;
}

module.exports = mySystem;
