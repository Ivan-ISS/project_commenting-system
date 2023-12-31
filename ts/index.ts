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
    { name: 'Студент', avatar: './images/png/avatar-student.png' },
    { name: 'Мультяшка', avatar: './images/png/avatar-cartoon.png' },
    { name: 'Смайл', avatar: './images/png/avatar-smile.png' },
    { name: 'Весельчак', avatar: './images/png/avatar-funny.png' },
  ];

function random (min: number, max: number): number {
    let result: number = Math.floor(Math.random() * (max - min + 1) + min);
    return result
}

const matchСhecking = (number: number): number => {
    if (number == <number><any>localStorage.getItem('random')) {
        number = random (0, users.length - 1)
        return matchСhecking(number)
    } else {
        localStorage.setItem('random', `${number}`);
        return number
    }
}

let randomNumber: number = matchСhecking(random(0, users.length - 1));
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
const btnFavorites: HTMLButtonElement | null = document.querySelector('.comments__btn_action_favorites');

//---Обработка ввода текста в textarea
textarea?.addEventListener('input', () => {
    let count = textarea.value.length;
    if (simbolCounter && messageWarning && btnSend && messageWarningMobile) {
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

//--------------------------------------------------СОРТИРОВКА КОММЕНТАРИЕВ--------------------------------------------------
//---Обработка нажатий на кнопку сортировки комментариев
btnSort?.addEventListener('click', () => {
    commentingSystem.sorting.showSortList();
    btnSort.classList.add('comments__btn-selected');
    commentsAll?.classList.remove('comments__btn-selected');
    btnFavorites?.classList.remove('comments__btn-selected');
});

//---Обработка нажатий на кнопку сортировки комментариев по оценке
btnSortByRating?.addEventListener('click', (event) => {
    commentingSystem.sorting.sortByRating(event.currentTarget as HTMLElement);
});

//---Обработка нажатий на кнопку сортировки комментариев по дате
btnSortByDate?.addEventListener('click', (event) => {
    commentingSystem.sorting.sortByDate(event.currentTarget as HTMLElement);
});

//---Обработка нажатий на кнопку сортировки комментариев по кол-ву ответов
btnSortByAnswer?.addEventListener('click', (event) => {
    commentingSystem.sorting.sortByNumberAnswer(event.currentTarget as HTMLElement);
});

//---Обработка нажатий на кнопку всех комментариев
commentsAll?.addEventListener('click', () => {
    commentingSystem.sorting.showAllComments();
    commentsAll.classList.add('comments__btn-selected');
    btnSort?.classList.remove('comments__btn-selected');
    btnFavorites?.classList.remove('comments__btn-selected');
});

//--------------------------------------------------ФИЛЬТР КОММЕНТАРИЕВ--------------------------------------------------

//---Обработка нажатий на кнопку "Избранное"
btnFavorites?.addEventListener('click', () => {
    commentingSystem.favorites.filterFavorites();
    btnFavorites.classList.add('comments__btn-selected');
    btnSort?.classList.remove('comments__btn-selected');
    commentsAll?.classList.remove('comments__btn-selected');
});