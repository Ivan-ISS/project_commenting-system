class Sorting {
    private _sortList: HTMLElement | null;
    private _comments: HTMLCollectionOf<Element>;
    private _displayArea: HTMLElement | null;
    private _commentsAll: HTMLElement | null;
    private _commentingSystem: CommentingSystem;
    private _allSortItem: NodeListOf<Element>;
    private _iconArrowDown: HTMLElement | null;
    private _iconArrowUp: HTMLElement | null;
    private _target: HTMLElement | null;
    private _arrComments: Element[];
    private _inscription: HTMLElement | null;

    constructor(commentingSystem: CommentingSystem) {
        this._sortList = document.querySelector('.comments__dropdown-sort-list');
        this._comments = document.getElementsByClassName('comment-in__new-comment')
        this._displayArea = document.querySelector('.comments__comment-in');
        this._commentsAll = document.querySelector('.comments__btn_action_all-comments');
        this._commentingSystem = commentingSystem;
        this._allSortItem = document.querySelectorAll('.sort-list-dropdown__sort-item');
        this._iconArrowDown = document.querySelector('.comments__arrow-icon-down');
        this._iconArrowUp = document.querySelector('.comments__arrow-icon-up');
        this._inscription = document.querySelector('.comments__btn-inscription');
        this._target = null;
        this._arrComments = [];

        // Слушатели событий click для кнопок направления сортировки-------------------------------
        this._iconArrowDown?.addEventListener('click', () => {
            this.showSortList();
            if (this._target?.textContent?.replace(/\s/g, '') === 'Поколичествуоценок') {   
                this._contentAreaPreparation();    
                for (let i = this._arrComments.length - 1; i >= 0; i--) {
                    this._displayArea?.appendChild(this._arrComments[i]);
                }
            }
        })

        this._iconArrowUp?.addEventListener('click', () => {
            this.showSortList();
            if (this._target?.textContent?.replace(/\s/g, '') === 'Поколичествуоценок') {
                this._contentAreaPreparation();
                for (let i = 0; i < this._arrComments.length; i++) {
                    this._displayArea?.appendChild(this._arrComments[i]);
                }
            }
        })

        this._iconArrowDown?.addEventListener('click', () => {
            this.showSortList();
            if (this._target?.textContent?.replace(/\s/g, '') === 'Подате') {
                this._contentAreaPreparation();
                for (let i = this._arrComments.length - 1; i >= 0; i--) {
                    this._displayArea?.appendChild(this._arrComments[i]);
                }
            }
        })

        this._iconArrowUp?.addEventListener('click', () => {
            this.showSortList();
            if (this._target?.textContent?.replace(/\s/g, '') === 'Подате') {
                this._contentAreaPreparation();
                for (let i = 0; i < this._arrComments.length; i++) {
                    this._displayArea?.appendChild(this._arrComments[i]);
                }
            }
        })

        this._iconArrowDown?.addEventListener('click', () => {
            this.showSortList();
            if (this._target?.textContent?.replace(/\s/g, '') === 'Поколичествуответов') {
                this._contentAreaPreparation();
                for (let i = this._arrComments.length - 1; i >= 0; i--) {
                    this._displayArea?.appendChild(this._arrComments[i]);
                }
            }
        })

        this._iconArrowUp?.addEventListener('click', () => {
            this.showSortList();
            if (this._target?.textContent?.replace(/\s/g, '') === 'Поколичествуответов') {
                this._contentAreaPreparation();
                for (let i = 0; i < this._arrComments.length; i++) {
                    this._displayArea?.appendChild(this._arrComments[i]);
                }
            }
        })
    }

    public showSortList(): void {
        this._sortList?.classList.toggle('comments__dropdown-sort-list_show');
    }

    public sortByRating(target?: HTMLElement): void {
        this._commentingSystem.commentsStorage.insertCommentHistory();
        // Объявляем вспомогательные переменные и массивы
        let rating: number;
        let arrRating: number[] = [];
        let arrComments: Element[] = [];

        // Перебираем каждый комментарий и записываем его оценку в переменную rating
        for (let i = 0; i < this._comments.length; i++) {
            rating = this._comments[i].querySelector('.buttons-comment__counter-rating')?.textContent as any as number;

            // Ищем позицию для вставки оценки в порядке убывания в массив
            let position = 0;
            while (position < arrRating.length && rating < +arrRating[position]) {
                position++
            }

            // Вставляем оценку в порядке убывания в найденную позицию и в эту же позицию другого массива вставляем комментарий
            arrRating.splice(position, 0, rating);
            arrComments.splice(position, 0, this._comments[i]);

        }

        // Ставим галочку напроотив выбранной позиции
        this.showSortList();
        this._allSortItem.forEach(element => {
            element.classList.remove('sort-list-dropdown__sort-item_checked');
        });

        this._allSortItem[1].classList.add('sort-list-dropdown__sort-item_checked');

        // Вставляем комментарии в порядке убывания оценок
        if (this._displayArea) {
            this._displayArea.innerHTML = '';
        }

        for (let i = 0; i < arrComments.length; i++) {
            this._displayArea?.appendChild(arrComments[i]);
        }

        this._target = target as HTMLElement;
        this._arrComments = arrComments;

        if (this._inscription) {
            this._inscription.textContent = this._target.textContent;
        }
    }

    public sortByDate(target?: HTMLElement): void {
        this._commentingSystem.commentsStorage.insertCommentHistory();
        // Объявляем вспомогательные переменные и массивы
        let time: number;
        let arrTime: number[] = [];
        let arrComments: Element[] = [];

        // Перебираем каждый комментарий и записываем время его создания в переменную time в миллисекундах
        for (let i = 0; i < this._comments.length; i++) {
            /* console.log(this._comments[i], ' ', this._comments[i].querySelector('.comment-in__time-milliseconds')?.textContent) */
            time = this._comments[i].querySelector('.comment-in__time-milliseconds')?.textContent as any as number;

            // Ищем позицию для вставки времени создания в порядке убывания в массив
            let position = 0;
            while (position < arrTime.length && time < arrTime[position]) {
                position++
            }

            // Вставляем время создания в порядке убывания в найденную позицию и в эту же позицию другого массива вставляем комментарий
            arrTime.splice(position, 0, time);
            arrComments.splice(position, 0, this._comments[i]);
        }

        // Ставим галочку напроотив выбранной позиции
        this.showSortList();
        this._allSortItem.forEach(element => {
            element.classList.remove('sort-list-dropdown__sort-item_checked');
        });
        this._allSortItem[0].classList.add('sort-list-dropdown__sort-item_checked');

        // Вставляем комментарии в порядке убывания времени создания
        if (this._displayArea) {
            this._displayArea.innerHTML = '';
        }

        for (let i = 0; i < arrComments.length; i++) {
            this._displayArea?.appendChild(arrComments[i]);
        }

        this._target = target as HTMLElement;
        this._arrComments = arrComments;

        if (this._inscription && this._target) {
            this._inscription.textContent = this._target.textContent;
        }
    }

    public sortByNumberAnswer(target?: HTMLElement): void {
        this._commentingSystem.commentsStorage.insertCommentHistory();
        // Объявляем вспомогательные переменные и массивы
        let numberOfAnswer: number;
        let arrNumberOfAnswer: number[] = [];
        let arrComments: Element[] = [];

        // Перебираем каждый комментарий и записываем кол-во ответов в переменную numberOfAnswer
        for (let i = 0; i < this._comments.length; i++) {
            console.log(this._comments[i], ' ', this._comments[i].querySelectorAll('.comment-answer')?.length)
            numberOfAnswer = this._comments[i].querySelectorAll('.comment-answer')?.length;

            // Ищем позицию для вставки кол-ва ответов в порядке убывания в массив
            let position = 0;
            while (position < arrNumberOfAnswer.length && numberOfAnswer < arrNumberOfAnswer[position]) {
                position++
            }

            // Вставляем кол-во ответов в порядке убывания в найденную позицию и в эту же позицию другого массива вставляем комментарий
            arrNumberOfAnswer.splice(position, 0, numberOfAnswer);
            arrComments.splice(position, 0, this._comments[i]);
        }

        // Ставим галочку напроотив выбранной позиции
        this.showSortList();
        this._allSortItem.forEach(element => {
            element.classList.remove('sort-list-dropdown__sort-item_checked');
        });
        this._allSortItem[2].classList.add('sort-list-dropdown__sort-item_checked');

        // Вставляем комментарии в порядке убывания кол-ва ответов
        if (this._displayArea) {
            this._displayArea.innerHTML = '';
        }

        for (let i = 0; i < arrComments.length; i++) {
            this._displayArea?.appendChild(arrComments[i]);
        }

        this._target = target as HTMLElement;
        this._arrComments = arrComments;

        if (this._inscription) {
            this._inscription.textContent = this._target.textContent;
        }
    }

    public showAllComments(): void {
        this._commentingSystem.commentsStorage.insertCommentHistory();
        this.sortByDate();
        this.showSortList();
        if (this._inscription) {
            this._inscription.textContent = 'Отсортировать';
        }
    }

    private _contentAreaPreparation(): void {
        this._iconArrowDown?.classList.toggle('comments__arrow-icon-show');
        this._iconArrowUp?.classList.toggle('comments__arrow-icon-show');

        if (this._displayArea) {
            this._displayArea.innerHTML = '';
        }
    }
}