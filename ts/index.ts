const commentingSystem: CommentingSystem = new CommentingSystem();

if (localStorage.getItem('data')) {
    const displayArea: Element | null = document.querySelector('.comments__comment-in');
    if (displayArea) {
        const div: HTMLElement = document.createElement('div');
        div.innerHTML = localStorage.getItem('data') as string;
        div.className = 'comment-in__new-comment';
        displayArea.appendChild(div);
        /* console.log(localStorage.getItem('data')); */
        commentingSystem._commentAnswer.displayCommentAnswer();
    }
}

const btnSend: HTMLElement | null = document.querySelector('.form__btn');
/* const btnAnswer: HTMLElement | null = document.querySelector('.comment-in__btn_execute_answer'); */

btnSend?.addEventListener('click', () => {
    
    if (commentingSystem.typeOfComment === 'send' || commentingSystem.typeOfComment === '') {
        console.log('работает')
        commentingSystem._comment.displayComment();
    }

    if (commentingSystem.typeOfComment === 'answer' || commentingSystem.typeOfComment === '') {
        console.log('работает ответ')
        commentingSystem._commentAnswer.displayCommentAnswer();
    }
});

/* const btnAnswer: Element = commentingSystem._commentAnswer.btnAnswer[0];
console.log(btnAnswer); */

/* commentingSystem._commentAnswer.btnAnswer[0]?.addEventListener('click', () => {
    console.log(commentingSystem._commentAnswer.btnAnswer[0])
    console.log('here')
}); */