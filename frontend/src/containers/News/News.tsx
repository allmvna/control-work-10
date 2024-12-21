import {Container} from "@mui/material";
import NewsList from "../../components/NewsList/NewsList.tsx";
import Navbar from "../../components/Navbar/Navbar.tsx";

const News = () => {
    return (
        <>
            <header>
                <Navbar/>
            </header>
            <main>
                <Container>
                    <NewsList/>
                </Container>
            </main>
        </>
    );
};

export default News;