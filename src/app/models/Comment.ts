export class Comments {
    id: number;
    reviewId: number;
    parentCommentId: number;
    nameSender: string;
    surnameSender: string;
    textComment: string;
    childComments: Comments[];
    showForm: boolean;
}