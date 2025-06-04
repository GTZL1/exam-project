import { Route, Routes } from "react-router";
import ENDPOINTS from "../constants/endpoints";
import QuizzPage from "../quizz/quizzPage";

function App() {
    return (<>
        <Routes>
            <Route path={ENDPOINTS.MAIN} element={<QuizzPage />} />
        </Routes>
    </>);
}

export default App;
