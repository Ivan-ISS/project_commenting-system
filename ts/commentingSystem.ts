class CommentingSystem {
    public comment: Comments;
    public commentAnswer: CommentsAnswer;
    private _userAvatar: string;
    private _userName: string;
    public typeOfComment: string;
    public commentsStorage: CommentsStorage;
    public rating: Rating;
    public sorting: Sorting;
    public favorites: Favorites;

    constructor (userName: string, userAvatar: string) {
        this.typeOfComment = '';
        this._userName = userName;
        this._userAvatar = userAvatar;
        this.comment = new Comments(this._userAvatar, this._userName, this);
        this.commentAnswer = new CommentsAnswer(this._userAvatar, this._userName, this);
        this.commentsStorage = new CommentsStorage(this);
        this.rating = new Rating(this);
        this.sorting = new Sorting(this);
        this.favorites = new Favorites(this);
    }
}