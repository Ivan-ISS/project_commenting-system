class CommentsAnswer {
    private _userAvatar: string;
    private _userName: string;
    private _textComment: string | undefined;
    private _textCommentArea: HTMLTextAreaElement | null;
    public btnAnswer: HTMLCollectionOf<Element>;
    private _div: HTMLElement;
    private _btnSend: HTMLElement | null;
    private _btnSendOn: HTMLElement | null;
    private _commentingSystem: CommentingSystem;

    constructor(_userAvatar: string, _userName: string, commentingSystem: CommentingSystem) {
        this._userAvatar = _userAvatar;
        this._userName = _userName;
        this._textCommentArea = document.querySelector('.form__textarea');
        this.btnAnswer = document.getElementsByClassName('buttons-comment__btn_execute_answer');
        this._div = document.createElement('div');
        this._btnSend = document.querySelector('.form__btn');
        this._btnSendOn = document.querySelector('.form__btn-answer');
        this._commentingSystem = commentingSystem;
    }

    private _getComment(): void {
        this._textComment = this._textCommentArea?.value;
    }

    public displayCommentAnswer(): void {
        this.btnAnswer = document.getElementsByClassName('buttons-comment__btn_execute_answer');
        console.log('здесь')
        /* const btnAnswerArray: Element[] = Array.from(this.btnAnswer);
        console.log(btnAnswerArray) */

        /* btnAnswerArray.forEach((btn, index) => {
            btn.addEventListener('click', (event) => {
                console.log(btn);
                console.log(btnAnswerArray[index]);
                console.log(event.currentTarget);
            });
        }); */

        this.btnAnswer[0].addEventListener('click', (event) => {
            /* this._btnSendOn?.classList.add('form__btn-answer_display-on') */

            this._commentingSystem.typeOfComment = 'answer';
            this._textCommentArea?.scrollIntoView();
            this._textCommentArea?.focus();
            
            const element: HTMLElement = event.currentTarget as HTMLElement;
            const parentCurrentTarget: HTMLElement | null = element.parentElement;
            const parentParentCurrentTarget: HTMLElement | null | undefined = parentCurrentTarget?.parentElement;

            this._div = document.createElement('div');
            this._div.className = 'comment-in__answer-comment comment-answer';
            this._div.innerHTML = 'answer';

            console.log('here');
            /* this._commentingSystem.typeOfComment = 'send'; */
            
            this._btnSend?.addEventListener('click', () => {
                /* console.log('here'); */
                this._getComment();
                /* console.log(this._textComment) */
                if (typeof this._textComment === 'string') {
                    if (this._textComment !== '') {
                        let txt: Text = document.createTextNode(this._textComment);
                        this._div.innerHTML = this._createContent(txt.nodeValue)
                    }
                    parentParentCurrentTarget?.appendChild(this._div);
                }
                this._commentingSystem.typeOfComment = 'send';
                this._clearTextArea();
            });
        });
    }

    private _clearTextArea(): void {
        if (this._textCommentArea) {
            this._textCommentArea.value = '';
        }
    }

    private _createContent(txt: string | null): string {
        const content: string =
        `
            <img class="comment-answer__avatar avatar" src="images/png/avatar-maxim.png" alt="Avatar">
            <div class="comment-answer__signatures">
                <span class="comment-answer__user-name name-user">
                    Максим Авдеенко
                </span>
                <span class="comment-answer__recipient-name">
                    <img class="comment-answer__icon-answer" src="images/svg/btn-answer.svg" alt="Icon-answer">
                    Максим Авдеенко
                </span>
                <span class="comment-answer__time time-comment">
                    15.01 13:55
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
                    <div class="buttons-comment__counter-rating">
                        0
                    </div>
                    <button class="buttons-comment__btn-rating buttons-comment__btn-rating_change_increase">
                        +
                    </button>
                </div>
            </div>
        `
        return content
    }
}