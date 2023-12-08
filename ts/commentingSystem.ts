class CommentingSystem {
    public _comment: Comments;
    private userAvatar: string = 'images/png/avatar-maxim.png';
    private userName: string = 'Максим Авдеенко';

    constructor () {
        this._comment = new Comments(this.userAvatar, this.userName);
    }
}