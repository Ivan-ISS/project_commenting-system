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
for (let i = 0; i < 1000; i++) { localStorage.removeItem(`${i}`); }

const btnSend: HTMLElement | null = document.querySelector('.form__btn');
let btnIncreaseRating = document.getElementsByClassName('buttons-comment__btn-rating_change_increase');
let btnDecreaseRating = document.getElementsByClassName('buttons-comment__btn-rating_change_decrease');
const btnSort = document.querySelector('.comments__btn_action_sort');
const btnSortByRating = document.querySelector('.sort-list-dropdown__btn_sort_by-rating');
const commentsAll: Element | null = document.querySelector('.comments__btn_action_all-comments');

//---Обработка нажатий на кнопки "отправить" и "ответить"
btnSend?.addEventListener('click', () => {
    
    if (commentingSystem.typeOfComment === 'send' || commentingSystem.typeOfComment === '') {
        commentingSystem.comment.displayComment();
    }

    if (commentingSystem.typeOfComment === 'answer' || commentingSystem.typeOfComment === '') {
        commentingSystem.commentAnswer.displayCommentAnswer();
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
for (let i = 0; i < btnIncreaseRating.length; i++) {
    btnIncreaseRating[i].addEventListener('click', (event) => {
        const btn: HTMLButtonElement = <HTMLButtonElement>event.currentTarget;
        if (!localStorage.getItem(`${i}`)) {
            localStorage.setItem(`${i}`, btn.previousElementSibling?.textContent as string); // Кладем в localStorage изначальное значение рейтинга
        }
        commentingSystem.rating.increaseRating(event.currentTarget, <number><any>localStorage.getItem(`${i}`));
    });
}

for (let i = 0; i < btnDecreaseRating.length; i++) {
    btnDecreaseRating[i].addEventListener('click', (event) => {
        const btn: HTMLButtonElement = <HTMLButtonElement>event.currentTarget;
        if (!localStorage.getItem(`${i}`)) {
            localStorage.setItem(`${i}`, btn.nextElementSibling?.textContent as string); // Кладем в localStorage изначальное значение рейтинга
        }
        commentingSystem.rating.decreaseRating(event.currentTarget, <number><any>localStorage.getItem(`${i}`));
    });
}


//--------------------------------------------------ФИЛЬТР КОММЕНТАРИЕВ--------------------------------------------------
//---Обработка нажатий на кнопку фильтра комментариев
btnSort?.addEventListener('click', () => {
    commentingSystem.sorting.showSortList();
});

//---Обработка нажатий на кнопку фильтра комментариев
btnSortByRating?.addEventListener('click', () => {
    commentingSystem.sorting.sortByRating();
});

//---Обработка нажатий на кнопку всех комментариев
commentsAll?.addEventListener('click', () => {
    commentingSystem.sorting.showAllComments();
});