class CommentingSystem {
    public _comment: Comments;
    public _commentAnswer: CommentsAnswer;
    private userAvatar: string = 'images/png/avatar-maxim.png';
    private userName: string = 'Максим Авдеенко';
    public typeOfComment: string;

    constructor () {
        this.typeOfComment = '';
        this._comment = new Comments(this.userAvatar, this.userName, this);
        this._commentAnswer = new CommentsAnswer(this.userAvatar, this.userName, this);
    }
}