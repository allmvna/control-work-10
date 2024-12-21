import express from "express";
import newsFileDb from "../../filesDb/newsFileDb";
import { NewsCreate } from "../../types";
import {imagesUpload} from "../../multer";

const newsRoutes = express.Router();

newsRoutes.get('/', async (req, res) => {
    try {
        const news = await newsFileDb.readNews();
        const result = news.map(({ content, ...rest }) => rest);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching news' });
    }
});


newsRoutes.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const news = await newsFileDb.readNews();
        const newsItem = news.find((n) => n.id === parseInt(id));

        if (newsItem) {
            res.json(newsItem);
        } else {
            res.status(404).json({ message: 'News not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching news' });
    }
});


newsRoutes.post('/',imagesUpload.single('image'),  async (req, res) => {
    const { title, content } = req.body;
    const image = req.file ? '/images' + req.file.filename : null;

    if (!title || !content) {
        res.status(400).json({ message: 'Title and content are required' });
        return;
    }

    const newNewsCreate: NewsCreate = {
        title,
        content,
        image
    };

    try {
        const addedNews = await newsFileDb.addNews(newNewsCreate);
        res.status(201).json(addedNews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding news' });
    }
});



newsRoutes.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await newsFileDb.deleteNews(parseInt(id));
        res.status(200).json({ message: 'News deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting news' });
    }
});

export default newsRoutes;