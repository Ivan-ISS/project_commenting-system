class CommentsStorage {
    private _commentContentAll: HTMLElement | null;
    private _commentingSystem: CommentingSystem;
    private _counterComments: HTMLElement | null;

    constructor(commentingSystem: CommentingSystem) {
        this._commentContentAll = document.querySelector('.comments__comment-in');
        this._commentingSystem = commentingSystem;
        this._counterComments = document.querySelector('.comments__counter');
    }

    public update() {
        /* localStorage.clear(); */
        localStorage.setItem('data', this._commentContentAll?.innerHTML as string);
    }

    public insertCommentHistory() {
        if (localStorage.getItem('data')) {
            if (this._commentContentAll) {
                this._commentContentAll.innerHTML = localStorage.getItem('data') as string;
                this._commentingSystem.commentAnswer.displayCommentAnswer();
            }
        }

        if (localStorage.getItem('numberOfComments')) {
            if (this._counterComments) {
                this._counterComments.textContent = `(${localStorage.getItem('numberOfComments')})`;
            }
        }
    }
}