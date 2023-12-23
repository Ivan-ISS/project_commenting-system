class CommentsStorage {
    private _commentContentAll: HTMLElement | null;
    private _commentingSystem: CommentingSystem;
    private _counterComments: HTMLElement | null;
    private _form: HTMLFormElement | null;

    constructor(commentingSystem: CommentingSystem) {
        this._commentContentAll = document.querySelector('.comments__comment-in');
        this._commentingSystem = commentingSystem;
        this._counterComments = document.querySelector('.comments__counter');
        this._form = document.querySelector('.comments__form');
    }

    public update() {
        /* localStorage.clear(); */
        /* console.log(this._commentContentAll?.innerHTML) */
        localStorage.setItem('data', this._commentContentAll?.innerHTML as string);
    }

    public insertCommentHistory() {
        if (this._form) {
            this._form.style.display = 'grid';
        }

        if (localStorage.getItem('data')) {
            if (this._commentContentAll) {
                this._commentContentAll.innerHTML = localStorage.getItem('data') as string;
                this._commentingSystem.commentAnswer.displayCommentAnswer();
                this._commentingSystem.favorites.toFavorites();
                this._commentingSystem.rating.increaseRating();
                this._commentingSystem.rating.decreaseRating();
            }
        }

        if (localStorage.getItem('numberOfComments')) {
            if (this._counterComments) {
                this._counterComments.textContent = `(${localStorage.getItem('numberOfComments')})`;
            }
        }
    }
}