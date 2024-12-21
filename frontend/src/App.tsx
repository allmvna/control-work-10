import {Route, Routes} from "react-router-dom";
import AddNews from "./containers/AddNews/AddNews.tsx";
import {Alert} from "@mui/material";
import News from "./containers/News/News.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import NewsDetail from "./containers/NewsDetail/NewsDetail.tsx";


const App = () =>{
    return (
        <>
            <header>
                <Navbar/>
            </header>
            <Routes>
                <Route path="/" element={<News/>}/>
                <Route path="/news/:id" element={<NewsDetail/>} />
                <Route path="/add" element={<AddNews/>}/>
                <Route
                    path="*"
                    element={<Alert severity="error">Not found</Alert>}
                />
            </Routes>
        </>
    );
};

export default App;
