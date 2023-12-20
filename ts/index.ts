//-------------------------------------------------ФУЕКЦИЯ ПОЛУЧЕНИЯ ДАТЫ И ВРЕМЕНИ---------------------------------------------
function getTimeAndDate(): string {
    //---Получение текущей даты и времени
    const currentDate: Date = new Date();

    //---Получение даты
    const date: number = currentDate.getDate();
    const month: number = currentDate.getMonth() + 1; // Январь - 0, поэтому прибавляем 1
    const year: number = currentDate.getFullYear();

    //---Получение времени
    const hours: number = currentDate.getHours();
    let minutes: number | string = currentDate.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    const seconds: number = currentDate.getSeconds();

    return `${date}.${month} ${hours}:${minutes}`;
}

//-----------------------------------------------------ГЕНЕРИРОВАНИЕ ПОЛЬЗОВАТЕЛЯ--------------------------------------------------
const users: { name: string; avatar: string }[] = [
    { name: 'Максим Авдеенко', avatar: './images/png/avatar-maxim.png' },
    { name: 'Джунбокс3000', avatar: './images/png/avatar-junebox.png' },
    { name: 'Алексей_1994b', avatar: './images/png/avatar-alexei.png' },
    { name: 'Мистер_душнила', avatar: './images/png/avatar-choking.png' },
  ];

function random (min: number, max: number): number {
    let result: number = Math.floor(Math.random() * (max - min + 1) + min);
    return result
}

let randomNumber: number = random(0, users.length - 1);
let userName: string = users[randomNumber].name;
let userAvatar: string = users[randomNumber].avatar;

const userNameElement: Element | null = document.querySelector('.form__user-name');
const userAvatarElement: HTMLImageElement | null = document.querySelector('.form__avatar');

if (userNameElement && userAvatarElement) {
    userNameElement.textContent = userName;
    userAvatarElement.src = userAvatar;
}

//--------------------------------------------------ЗАПУСК СИСТЕМЫ КОММЕНТИРОВАНИЯ--------------------------------------------------
const commentingSystem: CommentingSystem = new CommentingSystem(userName, userAvatar);

commentingSystem.commentsStorage.insertCommentHistory();
commentingSystem.sorting.sortByDate();
commentingSystem.sorting.showSortList();
for (let i = 0; i < 1000; i++) { localStorage.removeItem(`${i}`); }

const btnSend: HTMLButtonElement | null = document.querySelector('.form__btn');
let btnIncreaseRating = document.getElementsByClassName('buttons-comment__btn-rating_change_increase');
let btnDecreaseRating = document.getElementsByClassName('buttons-comment__btn-rating_change_decrease');
const btnSort = document.querySelector('.comments__btn_action_sort');
const btnSortByRating = document.querySelector('.sort-list-dropdown__btn_sort_by-rating');
const btnSortByDate = document.querySelector('.sort-list-dropdown__btn_sort_by-date');
const btnSortByAnswer = document.querySelector('.sort-list-dropdown__btn_sort_by-answer');
const commentsAll: Element | null = document.querySelector('.comments__btn_action_all-comments');
const textarea: HTMLTextAreaElement = <HTMLTextAreaElement>document.querySelector('.form__textarea');
const simbolCounter: HTMLElement | null = document.querySelector('.form__symbol-counter');
const messageWarning: HTMLElement | null = document.querySelector('.form__warning-desktop');
const messageWarningMobile: HTMLElement | null = document.querySelector('.form__warning-mobile');
/* const btnToFavorites: HTMLCollectionOf<Element> = document.getElementsByClassName('buttons-comment__btn_execute_to-favorites'); */
const btnFavorites: HTMLButtonElement | null = document.querySelector('.comments__btn_action_favorites');

//---Обработка ввода текста в textarea
textarea?.addEventListener('input', () => {
    let count = textarea.value.length;
    if (simbolCounter && messageWarning && btnSend && messageWarningMobile) {
        console.log(count);
        simbolCounter.textContent = `${count}/1000`;
        if (count > 1000) {
            simbolCounter.style.color = 'rgb(255, 0, 0)';
            simbolCounter.style.opacity = '1';
            messageWarning.style.opacity = '1';
            messageWarningMobile.style.opacity = '1';
        } else {
            simbolCounter.style.color = 'rgba(0, 0, 0, 0.40)';
            messageWarning.style.opacity = '0';
            messageWarningMobile.style.opacity = '0';
        }
        if (count >= 1 && count <= 1000) {
            btnSend.disabled = false;
            btnSend.style.background = '#abd873';
        } else {
            btnSend.disabled = true;
            btnSend.style.background = '#a1a1a1';
        }
    }
})

//---Обработка нажатий на кнопки "отправить" и "ответить"
btnSend?.addEventListener('click', () => {
    
    if (commentingSystem.typeOfComment === 'send' || commentingSystem.typeOfComment === '') {
        commentingSystem.comment.displayComment();
        if (simbolCounter) simbolCounter.textContent = 'Макс. 1000 символов';
        btnSend.disabled = true;
        btnSend.style.background = '#a1a1a1';
    }

    if (commentingSystem.typeOfComment === 'answer' || commentingSystem.typeOfComment === '') {
        commentingSystem.commentAnswer.displayCommentAnswer();
        if (simbolCounter) simbolCounter.textContent = 'Макс. 1000 символов';
        btnSend.disabled = true;
        btnSend.style.background = '#a1a1a1';
    }

});

//---Активация кнопок изменения рейтинга комментария
for (let i = 0; i < btnIncreaseRating.length; i++) {
    const btn: HTMLButtonElement = btnIncreaseRating[i] as HTMLButtonElement;
    btn.disabled = false;
}

for (let i = 0; i < btnDecreaseRating.length; i++) {
    const btn: HTMLButtonElement = btnDecreaseRating[i] as HTMLButtonElement;
    btn.disabled = false;
}

//---Обработка нажатий на кнопки увеличения и уменьшения рейтинга комментария
/* for (let i = 0; i < btnIncreaseRating.length; i++) {
    btnIncreaseRating[i].addEventListener('click', (event) => {
        const btn: HTMLButtonElement = <HTMLButtonElement>event.currentTarget;
        if (!localStorage.getItem(`${i}`)) {
            localStorage.setItem(`${i}`, btn.previousElementSibling?.textContent as string);
        }
        commentingSystem.rating.increaseRating(event.currentTarget, <number><any>localStorage.getItem(`${i}`));
    });
}

for (let i = 0; i < btnDecreaseRating.length; i++) {
    btnDecreaseRating[i].addEventListener('click', (event) => {
        const btn: HTMLButtonElement = <HTMLButtonElement>event.currentTarget;
        if (!localStorage.getItem(`${i}`)) {
            localStorage.setItem(`${i}`, btn.nextElementSibling?.textContent as string);
        }
        commentingSystem.rating.decreaseRating(event.currentTarget, <number><any>localStorage.getItem(`${i}`));
    });
} */


//--------------------------------------------------СОРТИРОВКА КОММЕНТАРИЕВ--------------------------------------------------
//---Обработка нажатий на кнопку сортировки комментариев
btnSort?.addEventListener('click', () => {
    commentingSystem.sorting.showSortList();
});

//---Обработка нажатий на кнопку сортировки комментариев по оценке
btnSortByRating?.addEventListener('click', () => {
    commentingSystem.sorting.sortByRating();
    /* if (btnSort) {
        btnSort.textContent = btnSortByRating.textContent;
    } */
});

//---Обработка нажатий на кнопку сортировки комментариев по дате
btnSortByDate?.addEventListener('click', () => {
    commentingSystem.sorting.sortByDate();
});

//---Обработка нажатий на кнопку сортировки комментариев по кол-ву ответов
btnSortByAnswer?.addEventListener('click', () => {
    commentingSystem.sorting.sortByNumberAnswer();
});

//---Обработка нажатий на кнопку всех комментариев
commentsAll?.addEventListener('click', () => {
    commentingSystem.sorting.showAllComments();
});

//--------------------------------------------------ФИЛЬТР КОММЕНТАРИЕВ--------------------------------------------------
/* commentingSystem.favorites.toFavorites(); */
//---Обработка нажатий на кнопки "В избранное"
/* for (let i = 0; i < btnToFavorites.length; i++) {
    btnToFavorites[i].addEventListener('click', (event) => {
        const btn: HTMLButtonElement = <HTMLButtonElement>event.currentTarget;
        commentingSystem.favorites.toFavorites(event.currentTarget);
    });
} */

//---Обработка нажатий на кнопки "Избранное"
btnFavorites?.addEventListener('click', () => {
    commentingSystem.favorites.filterFavorites();
});