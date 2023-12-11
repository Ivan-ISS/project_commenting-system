function getTimeAndDate(): string {
    // Получение текущей даты и времени
    const currentDate: Date = new Date();

    // Получение даты
    const date: number = currentDate.getDate();
    const month: number = currentDate.getMonth() + 1; // Январь - 0, поэтому прибавляем 1
    const year: number = currentDate.getFullYear();

    // Получение времени
    const hours: number = currentDate.getHours();
    const minutes: number = currentDate.getMinutes();
    const seconds: number = currentDate.getSeconds();

    return `${date}.${month} ${hours}:${minutes}`;
}

//---------------------Генерирование пользователя--------------------
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
let userName: string = users[randomNumber].name
let userAvatar: string = users[randomNumber].avatar

const userNameElement: Element | null = document.querySelector('.form__user-name');
const userAvatarElement: HTMLImageElement | null = document.querySelector('.form__avatar');

if (userNameElement && userAvatarElement) {
    userNameElement.textContent = userName;
    userAvatarElement.src = userAvatar;
}

//---------------------Запуск системы комментирования--------------------
const commentingSystem: CommentingSystem = new CommentingSystem(userName, userAvatar);

commentingSystem.commentsStorage.insertCommentHistory();

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