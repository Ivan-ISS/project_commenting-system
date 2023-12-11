class CommentsStorage {
    private _commentContentAll: HTMLElement | null;
    private _commentingSystem: CommentingSystem;

    constructor(commentingSystem: CommentingSystem) {
        this._commentContentAll = document.querySelector('.comments__comment-in');
        this._commentingSystem = commentingSystem;
    }

    public update() {
        localStorage.clear();
        localStorage.setItem('data', this._commentContentAll?.innerHTML as string);
    }

    public insertCommentHistory() {
        if (localStorage.getItem('data')) {
            if (this._commentContentAll) {
                this._commentContentAll.innerHTML = localStorage.getItem('data') as string;
                this._commentingSystem.commentAnswer.displayCommentAnswer();
            }
        }
    }
}