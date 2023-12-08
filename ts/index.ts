const commentingSystem: CommentingSystem = new CommentingSystem();

const btnSend: HTMLElement | null = document.querySelector('.form__btn');

btnSend?.addEventListener('click', () => {
    commentingSystem._comment.displayComment();
});