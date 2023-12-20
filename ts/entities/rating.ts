class Rating {
    private _btnIncrease: HTMLButtonElement | null;
    private _btnDecrease: HTMLButtonElement | null;
    private _btnIncreaseRating: HTMLCollectionOf<Element>;
    private _btnDecreaseRating: HTMLCollectionOf<Element>;
    private _commentingSystem: CommentingSystem;
    private _initialValueRating: number | null;

    constructor(commentingSystem: CommentingSystem) {
        this._btnIncrease = null;
        this._btnDecrease = null;
        this._btnIncreaseRating = document.getElementsByClassName('buttons-comment__btn-rating_change_increase');
        this._btnDecreaseRating = document.getElementsByClassName('buttons-comment__btn-rating_change_decrease');
        this._commentingSystem = commentingSystem;
        this._initialValueRating = null;
    }

    public increaseRating(/* target: EventTarget | null, initialValueRating: number */) {
        /* if (!this._btnIncrease?.disabled) */
        for (let i = 0; i < this._btnIncreaseRating.length; i++) {
            this._btnIncreaseRating[i].addEventListener('click', (event) => {
                this._btnIncrease = <HTMLButtonElement>event.currentTarget;
                if (!localStorage.getItem(`${i}`)) {
                    localStorage.setItem(`${i}`, this._btnIncrease.previousElementSibling?.textContent as string); // Кладем в localStorage изначальное значение рейтинга
                }

                this._initialValueRating = <number><any>localStorage.getItem(`${i}`);

                /* this._btnIncrease = event.currentTarget as HTMLButtonElement; */
                const ratingElement: HTMLElement | null = this._btnIncrease.previousElementSibling as HTMLElement;
                this._btnDecrease = ratingElement?.previousElementSibling as HTMLButtonElement;

                let counter: number = <number><any>ratingElement?.textContent;
                counter++;

                if (counter < 0 && ratingElement) {
                    ratingElement.style.color = '#F00';
                }

                if (counter >= 0 && ratingElement) {
                    ratingElement.style.color = '#8AC540';
                }
                console.log(this._btnIncrease?.disabled)
                if (ratingElement) {
                    ratingElement.textContent = `${counter}`;
                }

                this._commentingSystem.commentsStorage.update();

                /* console.log(counter) */
                if (counter > this._initialValueRating) {
                    this._btnIncrease.disabled = true;
                }

                this._btnDecrease.disabled = false;

                /* console.log(initialValueRating) */
            })
        }
    }

    public decreaseRating(/* target: EventTarget | null, initialValueRating: number */) {
        /* if (!this._btnDecrease?.disabled) */
        for (let i = 0; i < this._btnDecreaseRating.length; i++) {
            this._btnDecreaseRating[i].addEventListener('click', (event) => {
                this._btnDecrease = <HTMLButtonElement>event.currentTarget;
                if (!localStorage.getItem(`${i}`)) {
                    localStorage.setItem(`${i}`, this._btnDecrease.nextElementSibling?.textContent as string); // Кладем в localStorage изначальное значение рейтинга
                }

                this._initialValueRating = <number><any>localStorage.getItem(`${i}`);

                /* this._btnDecrease = event.currentTarget as HTMLButtonElement; */
                const ratingElement: HTMLElement | null = this._btnDecrease.nextElementSibling as HTMLElement;
                this._btnIncrease = ratingElement?.nextElementSibling as HTMLButtonElement;

                let counter: number = <number><any>ratingElement?.textContent;

                counter--;

                if (counter < 0 && ratingElement) {
                    ratingElement.style.color = '#F00';
                }

                if (counter >= 0 && ratingElement) {
                    ratingElement.style.color = '#8AC540';
                }

                if (ratingElement) {
                    ratingElement.textContent = `${counter}`;
                }

                this._commentingSystem.commentsStorage.update();


                if (counter < this._initialValueRating) {
                    /* console.log(counter) */
                    this._btnDecrease.disabled = true;
                }

                this._btnIncrease.disabled = false;

                /* console.log(initialValueRating) */
            })
        }
    }
}