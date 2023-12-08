class Comments {
    private _userAvatar: string;
    private _userName: string;
    private _textCommentArea: HTMLTextAreaElement | null;
    private _textComment: string | undefined;
    private _displayArea: HTMLElement | null;
    private _div: HTMLElement;

    constructor(_userAvatar: string, _userName: string) {
        this._userAvatar = _userAvatar;
        this._userName = _userName;
        this._textCommentArea = document.querySelector('.form__textarea');
        this._displayArea = document.querySelector('.comments__comment-in');
        this._div = document.createElement('div');
    }

    private _getComment(): void {
        this._textComment = this._textCommentArea?.value;
    }

    public displayComment(): void {
        this._getComment();

        if (typeof this._textComment === 'string' && this._displayArea) {
            const txt: Text = document.createTextNode(this._textComment);
            this._div = document.createElement('div');
            this._div.innerHTML = this._createContent(txt.nodeValue)
            this._div.className = 'comment-in__new-comment';
            
            if (this._displayArea.hasChildNodes()) {
                this._displayArea.insertBefore(this._div, this._displayArea.firstElementChild)
            } else {
                this._displayArea.appendChild(this._div);
            }
        }

        this._clearTextArea();
    }

    private _clearTextArea() {
        if (this._textCommentArea) {
            this._textCommentArea.value = '';
        }
    }

    private _createContent(txt: string | null): string {
        const content: string =
        `
            <img class="comment-in__avatar avatar" src="images/png/avatar-maxim.png" alt="Avatar">
            <div class="comment-in__signatures">
                <span class="comment-in__user-name name-user">
                    Максим Авдеенко
                </span>
                <span class="comment-in__time">
                    15.01 13:55
                </span>
            </div>
            <p class="comment-in__text-comment">
                ${txt}
            </p>
            <div class="comment-in__buttons">
                <button class="comment-in__btn comment-in__btn_execute_answer">
                    <img class="comment-in__btn-icon-answer" src="images/svg/btn-answer.svg" alt="Icon-answer">
                    Ответить
                </button>
                <button class="comment-in__btn comment-in__btn_execute_to-favorites">
                    <img class="comment-in__btn-icon-favorites" src="images/svg/btn-to-favorites.svg" alt="Icon-favorites">
                    В избранное
                </button>
                <div class="comment-in__buttons-rating">
                    <button class="comment-in__btn-rating comment-in__btn-rating_change_decrease">
                        -
                    </button>
                    <div class="comment-in__counter-rating">
                        0
                    </div>
                    <button class="comment-in__btn-rating comment-in__btn-rating_change_increase">
                        +
                    </button>
                </div>
            </div>
        `
        return content
    }
}