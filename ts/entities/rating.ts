class Rating {
    private _btnIncrease: HTMLButtonElement | null;
    private _btnDecrease: HTMLButtonElement | null;
    private _commentingSystem: CommentingSystem;
    private _initialValueRating: { value: number; };

    constructor(commentingSystem: CommentingSystem) {
        this._btnIncrease = document.querySelector('.buttons-comment__btn-rating_change_increase');
        this._btnDecrease = document.querySelector('.buttons-comment__btn-rating_change_increase');
        this._commentingSystem = commentingSystem;
        this._initialValueRating = {value: NaN};
    }

    public increaseRating(target: EventTarget | null, initialValueRating: number) {
        this._btnIncrease = target as HTMLButtonElement;
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

        if (ratingElement) {
            ratingElement.textContent = `${counter}`;
        }

        this._commentingSystem.commentsStorage.update();

        /* console.log(counter) */
        if (counter > initialValueRating) {
            this._btnIncrease.disabled = true;
        }

        this._btnDecrease.disabled = false;

        /* console.log(initialValueRating) */
    }

    public decreaseRating(target: EventTarget | null, initialValueRating: number) {
        this._btnDecrease = target as HTMLButtonElement;
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


        if (counter < initialValueRating) {
            /* console.log(counter) */
            this._btnDecrease.disabled = true;
        }

        this._btnIncrease.disabled = false;

        /* console.log(initialValueRating) */
    }
}