import express from 'express';
import commentsRoutes from "./routes/comments/comments";
import newsRoutes from "./routes/news/news";

const app = express();
const port = 8000;

app.use(express.json());

app.use('/news', newsRoutes);
app.use('/comments', commentsRoutes);

const run = async () => {
    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
};

run().catch(e => console.error(e));


