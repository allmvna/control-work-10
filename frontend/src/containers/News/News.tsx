import {Container} from "@mui/material";
import NewsList from "../../components/NewsList/NewsList.tsx";

const News = () => {
    return (
        <>
            <main>
                <Container>
                    <NewsList/>
                </Container>
            </main>
        </>
    );
};

export default News;