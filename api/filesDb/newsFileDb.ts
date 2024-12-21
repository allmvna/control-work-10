import { promises as fs } from 'fs';
import path from 'path';
import {News, NewsCreate} from "../types";

const newsFilePath = path.join(__dirname, '../data/news.json');

const newsFileDb = {
    async init() {
        try {
            await fs.mkdir(path.dirname(newsFilePath), { recursive: true });
            try {
                await fs.access(newsFilePath);
            } catch {
                await fs.writeFile(newsFilePath, JSON.stringify([], null, 2));
            }
        } catch (error) {
            console.error(error);
        }
    },

    async readNews(): Promise<News[]> {
        await this.init();
        try {
            const data = await fs.readFile(newsFilePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    async writeNews(news: News[]): Promise<void> {
        try {
            await fs.writeFile(newsFilePath, JSON.stringify(news, null, 2), 'utf-8');
        } catch (error) {
            console.error(error);
        }
    },

    async addNews(news: NewsCreate): Promise<News> {
        const currentNews = await this.readNews();
        const newId = currentNews.length > 0 ? Math.max(...currentNews.map((n) => n.id)) + 1 : 1;

        const newNews: News = {
            ...news,
            id: newId,
            imageDate: news.image ? new Date().toISOString() : '',
        };

        currentNews.push(newNews);
        await this.writeNews(currentNews);
        return newNews;
    },


    async deleteNews(id: number): Promise<void> {
        let currentNews = await this.readNews();
        currentNews = currentNews.filter((news) => news.id !== id);
        await this.writeNews(currentNews);
    },
};

export default newsFileDb;
