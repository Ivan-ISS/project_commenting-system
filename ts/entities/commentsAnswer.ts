class CommentsAnswer {
    private _userAvatar: string;
    private _userName: string;
    private _textComment: string | undefined;
    private _textCommentArea: HTMLTextAreaElement | null;
    public btnAnswer: HTMLCollectionOf<Element>;
    private _displayArea: HTMLElement | null;
    private _div: HTMLElement;
    private _btnSend: HTMLElement | null;
    private _commentingSystem: CommentingSystem;
    private _commentContentAll: HTMLElement | null;

    constructor(_userAvatar: string, _userName: string, commentingSystem: CommentingSystem) {
        this._userAvatar = _userAvatar;
        this._userName = _userName;
        this._textCommentArea = document.querySelector('.form__textarea');
        this._displayArea = document.querySelector('.comments__comment-in');
        this.btnAnswer = document.getElementsByClassName('buttons-comment__btn_execute_answer');
        this._div = document.createElement('div');
        this._btnSend = document.querySelector('.form__btn');
        this._commentingSystem = commentingSystem;
        this._commentContentAll = document.querySelector('.comments__comment-in');
    }

    private _getComment(): void {
        this._textComment = this._textCommentArea?.value;
    }

    public displayCommentAnswer(): void {
        this.btnAnswer = document.getElementsByClassName('buttons-comment__btn_execute_answer');

        for (let i = 0; i < this.btnAnswer.length; i++) {
            this.btnAnswer[i].addEventListener('click', (event) => {

                this._commentingSystem.typeOfComment = 'answer';
                this._textCommentArea?.scrollIntoView();
                this._textCommentArea?.focus();
                
                const element: HTMLElement = event.currentTarget as HTMLElement;
                const parentCurrentTarget: HTMLElement | null = element.parentElement;
                const parentParentCurrentTarget: HTMLElement | null | undefined = parentCurrentTarget?.parentElement;
                let recipientName: string | null | undefined = parentParentCurrentTarget?.querySelector('.comment-in__user-name')?.textContent;

                this._div = document.createElement('div');
                this._div.className = 'comment-in__answer-comment comment-answer';

                localStorage.setItem('recipientName', recipientName as string);
                
                this._btnSend?.addEventListener('click', () => {
                    this._getComment();
                    if (typeof this._textComment === 'string') {
                        if (this._textComment !== '') {
                            let txt: Text = document.createTextNode(this._textComment);
                            const dateAndTime: string = getTimeAndDate();
                            this._div.innerHTML = this._createContent(txt.nodeValue, dateAndTime, this._userName, this._userAvatar, localStorage.getItem('recipientName') as string);
                        }
                        parentParentCurrentTarget?.appendChild(this._div);
                    }
                    this._commentingSystem.commentsStorage.update();
                    this._commentingSystem.typeOfComment = 'send';
                    this._clearTextArea();
                });
            });
        }
    }

    private _clearTextArea(): void {
        if (this._textCommentArea) {
            this._textCommentArea.value = '';
        }
    }

    private _createContent(txt: string | null, dateAndTime: string, userName: string, userAvatar: string, recipientName: string): string {
        this._commentingSystem.comment.changeNumberOfComments();
        const content: string =
        `
            <img class="comment-answer__avatar avatar" src="${userAvatar}" alt="Avatar">
            <div class="comment-answer__signatures">
                <span class="comment-answer__user-name name-user">
                    ${userName}
                </span>
                <span class="comment-answer__recipient-name">
                    <img class="comment-answer__icon-answer" src="images/svg/btn-answer.svg" alt="Icon-answer">
                    ${recipientName}
                </span>
                <span class="comment-answer__time time-comment">
                    ${dateAndTime}
                </span>
                <span class="comment-answer__recipient-name-mobile">
                    <img class="comment-answer__icon-answer" src="images/svg/btn-answer.svg" alt="Icon-answer">
                    Максим Авдеенко
                </span>
            </div>
            <p class="comment-answer__text-comment">
                ${txt}
            </p>
            <div class="comment-in__buttons buttons-comment">
                <button class="buttons-comment__btn buttons-comment__btn_execute_to-favorites">
                    <img class="buttons-comment__btn-icon-favorites" src="images/svg/btn-to-favorites.svg" alt="Icon-favorites">
                    В избранное
                </button>
                <div class="buttons-comment__buttons-rating">
                    <button class="buttons-comment__btn-rating buttons-comment__btn-rating_change_decrease">
                        -
                    </button>
                    <div class="buttons-comment__counter-rating">0</div>
                    <button class="buttons-comment__btn-rating buttons-comment__btn-rating_change_increase">
                        +
                    </button>
                </div>
            </div>
        `
        return content
    }
}