import { Comments } from "./Comment";

export class Review {
    id: number;
    userId: number;
    filmId: number;
    filmName: string;
    name: string;
    surname: string;
    header: string;
    textReview: string;
    status: string;
    showFullReviewText: boolean;
    comments: Comments[];
}
