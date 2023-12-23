class Favorites {
    private _btnToFavorites: HTMLElement | null;
    private _commentingSystem: CommentingSystem;
    public _comments: HTMLCollectionOf<Element> | null;
    private _displayArea: HTMLElement | null;
    private _form: HTMLFormElement | null;
    private _commentsAnswer: HTMLCollectionOf<Element>;
    private _toFavorites: HTMLCollectionOf<Element>;

    constructor(commentingSystem: CommentingSystem) {
        this._btnToFavorites = null;
        this._comments = null;
        this._commentsAnswer = document.getElementsByClassName('comment-answer');
        this._displayArea = document.querySelector('.comments__comment-in');
        this._form = document.querySelector('.comments__form');
        this._toFavorites = document.getElementsByClassName('buttons-comment__btn_execute_to-favorites');
        this._commentingSystem = commentingSystem;
    }

    public toFavorites (/* target: EventTarget | null */) {
        for (let i = 0; i < this._toFavorites.length; i++) {
            this._toFavorites[i].addEventListener('click', (event) => {
                this._btnToFavorites = <HTMLElement>event.currentTarget;

                // Если еще не в избранном, то добавить. Если уже в избранном, то убрать
                if (this._btnToFavorites.innerHTML.replace(/\s/g, '') == `<imgclass="buttons-comment__btn-icon-favorites"src="images/svg/btn-to-favorites.svg"alt="Icon-favorites">Визбранное`) {
                    this._btnToFavorites.innerHTML = `<img class="buttons-comment__btn-icon-favorites" src="images/svg/btn-from-favorites.svg" alt="Icon-favorites">В избранном`;
                } else {
                    this._btnToFavorites.innerHTML = `<img class="buttons-comment__btn-icon-favorites" src="images/svg/btn-to-favorites.svg" alt="Icon-favorites">В избранное`;
                }
                this._commentingSystem.commentsStorage.update();
            })
        }    
    }

    public filterFavorites() {
        this._comments = document.getElementsByClassName('comment-in__new-comment');
        let arrComments: Element[] = [];

        // Просматриваем все комментарии и отправляем в массив те, которые имеют контент 'В избранном'
        for (let i = 0; i < this._comments.length; i++) {
            const elementik: HTMLElement = this._comments[i] as HTMLElement;
            if (this._comments[i].querySelector('.buttons-comment__btn_execute_to-favorites')?.textContent === 'В избранном') {
                console.log(this._comments[i], ' ', this._comments[i].querySelector('.buttons-comment__btn_execute_to-favorites')?.textContent);
                arrComments.push(this._comments[i]);
            }
        }

        for (let i = 0; i < this._commentsAnswer.length; i++) {
            if (this._commentsAnswer[i].querySelector('.buttons-comment__btn_execute_to-favorites')?.textContent === 'В избранном') {
                console.log(this._commentsAnswer[i], ' ', this._commentsAnswer[i].querySelector('.buttons-comment__btn_execute_to-favorites')?.textContent);
                const answers: HTMLElement = this._commentsAnswer[i] as HTMLElement;
                answers.style.margin = '0 0 28px 0';
                arrComments.push(answers);
            }
        }

        // Пробегаем по всем избранным комментариям и удаляем у них ответы
        for (let j = 0; j < arrComments.length; j++) {
            arrComments[j].querySelectorAll('.comment-in__answer-comment').forEach(element => {
                arrComments[j].removeChild(element);
            });

            arrComments[j].querySelectorAll('.comment-in__buttons').forEach(element => {
                const buttons: HTMLElement = element as HTMLElement;
                buttons.style.display = 'none';
            });
        }

        if (this._form) {
            this._form.style.display = 'none';
        }

        // Вставляем избранные комментарии
        if (this._displayArea) {
            this._displayArea.innerHTML = '';
        }

        for (let i = 0; i < arrComments.length; i++) {
            this._displayArea?.appendChild(arrComments[i]);
        }
    }
}