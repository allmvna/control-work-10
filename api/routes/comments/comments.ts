import express from 'express';
import newsFileDb from "../../filesDb/newsFileDb";
import commentsFileDb from "../../filesDb/commentsFileDb";

const commentsRoutes = express.Router();

commentsRoutes.get('/', async (req, res) => {
    const { news_id } = req.query;

    try {
        if (news_id) {
            const newsId = parseInt(news_id as string);
            const comments = await commentsFileDb.getCommentsByNewsId(newsId);
            res.json(comments);
        } else {
            const comments = await commentsFileDb.readComments();
            res.json(comments);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching comments' });
    }
});


commentsRoutes.post('/', async (req, res) => {
    const { newsId, author, text } = req.body;

    if (!newsId || !text) {
        res.status(400).json({ message: 'News ID and comment text are required' });
        return;
    }

    try {

        const allNews = await newsFileDb.readNews();
        const newsExists = allNews.some((news) => news.id === newsId);

        if (!newsExists) {
            res.status(404).json({ message: 'News not found' });
            return;
        }

        const newComment = await commentsFileDb.addComment(newsId, author, text);
        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding comment' });
    }
});


commentsRoutes.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await commentsFileDb.deleteComment(parseInt(id));
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting comment' });
    }
});

export default commentsRoutes;
