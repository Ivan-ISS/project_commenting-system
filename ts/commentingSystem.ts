class CommentingSystem {
    public comment: Comments;
    public commentAnswer: CommentsAnswer;
    private _userAvatar: string;
    private _userName: string;
    public typeOfComment: string;
    public commentsStorage: CommentsStorage;

    constructor (userName: string, userAvatar: string) {
        this.typeOfComment = '';
        this._userName = userName;
        this._userAvatar = userAvatar;
        this.comment = new Comments(this._userAvatar, this._userName, this);
        this.commentAnswer = new CommentsAnswer(this._userAvatar, this._userName, this);
        this.commentsStorage = new CommentsStorage(this);
    }
}