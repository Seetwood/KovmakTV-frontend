import { Genre } from "./Genre";

export class Film {
    id: number;
    name: string;
    yearOfRelease:number;
    duration:number;
    description:string;
    country:string;
    genre: Genre;
    imagesList:{imageName: string, imageUrl: string}[];
    videosList:{traillerName: string, traillerUrl: string}[];

    url = "http://127.0.0.1:9000/";
}