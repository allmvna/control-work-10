export interface News {
    id: number;
    title: string;
    content: string;
    image: string | null;
    imageDate: string;
}

export interface NewsCreate {
    title: string;
    content: string;
    image: string | null;
}

export interface Comment {
    id: number;
    newsId: number;
    author: string;
    text: string;
}