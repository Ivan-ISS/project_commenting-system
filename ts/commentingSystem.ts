class CommentingSystem {
    public comment: Comments;
    public commentAnswer: CommentsAnswer;
    private userAvatar: string = 'images/png/avatar-maxim.png';
    private userName: string = 'Максим Авдеенко';
    public typeOfComment: string;
    public commentsStorage: CommentsStorage;

    constructor () {
        this.typeOfComment = '';
        this.comment = new Comments(this.userAvatar, this.userName, this);
        this.commentAnswer = new CommentsAnswer(this.userAvatar, this.userName, this);
        this.commentsStorage = new CommentsStorage(this);
    }
}