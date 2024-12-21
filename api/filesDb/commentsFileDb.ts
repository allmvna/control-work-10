import { promises as fs } from 'fs';
import path from 'path';
import { Comment } from "../types";

const commentsFilePath = path.join(__dirname, '../data/comments.json');

const commentsFileDb = {
    async init() {
        try {
            await fs.mkdir(path.dirname(commentsFilePath), { recursive: true });
            try {
                await fs.access(commentsFilePath);
            } catch {
                await fs.writeFile(commentsFilePath, JSON.stringify([], null, 2));
            }
        } catch (error) {
            console.error(error);
        }
    },


    async readComments(): Promise<Comment[]> {
        await this.init();
        try {
            const data = await fs.readFile(commentsFilePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    async writeComments(comments: Comment[]): Promise<void> {
        try {
            await fs.writeFile(commentsFilePath, JSON.stringify(comments, null, 2), 'utf-8');
        } catch (error) {
            console.error(error);
        }
    },

    async addComment(newsId: number, author: string, text: string): Promise<Comment> {
        const currentComments = await this.readComments();

        const newId = currentComments.length > 0 ? Math.max(...currentComments.map(c => c.id)) + 1 : 1;

        const newComment: Comment = {
            id: newId,
            newsId,
            author: author || 'Anonymous',
            text
        };

        currentComments.push(newComment);
        await this.writeComments(currentComments);
        return newComment;
    },

    async deleteComment(id: number): Promise<void> {
        let currentComments = await this.readComments();
        currentComments = currentComments.filter(comment => comment.id !== id);
        await this.writeComments(currentComments);
    },

    async getCommentsByNewsId(newsId: number): Promise<Comment[]> {
        const comments = await this.readComments();
        return comments.filter(comment => comment.newsId === newsId);
    }
};

export default commentsFileDb;
