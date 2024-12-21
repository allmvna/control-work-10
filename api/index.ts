import express from 'express';
import commentsRoutes from "./routes/comments/comments";
import newsRoutes from "./routes/news/news";
import newsFileDb from "./filesDb/newsFileDb";
import commentsFileDb from "./filesDb/commentsFileDb";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/news', newsRoutes);
app.use('/comments', commentsRoutes);

const run = async () => {
    await newsFileDb.init();
    await commentsFileDb.init();

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
};

run().catch(e => console.error(e));


