const mySystem = {
    posts: [],
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
