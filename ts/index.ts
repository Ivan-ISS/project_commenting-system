const commentingSystem: CommentingSystem = new CommentingSystem();

commentingSystem.commentsStorage.insertCommentHistory();

/* if (localStorage.getItem('data')) {
    const displayArea: Element | null = document.querySelector('.comments__comment-in');
    if (displayArea) {
        displayArea.innerHTML = localStorage.getItem('data') as string;
        commentingSystem.commentAnswer.displayCommentAnswer();
    }
} */

const btnSend: HTMLElement | null = document.querySelector('.form__btn');

btnSend?.addEventListener('click', () => {
    
    if (commentingSystem.typeOfComment === 'send' || commentingSystem.typeOfComment === '') {
        console.log('работает')
        commentingSystem.comment.displayComment();
    }

    if (commentingSystem.typeOfComment === 'answer' || commentingSystem.typeOfComment === '') {
        console.log('работает ответ')
        commentingSystem.commentAnswer.displayCommentAnswer();
    }
});