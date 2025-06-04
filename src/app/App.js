import { Route, Routes } from "react-router";
import ENDPOINTS from "../constants/endpoints";
import QuizzPage from "../quizz/quizzPage";
import ResultPage from "../results/resultPage";

function App() {
    return (<>
        <Routes>
            <Route path={ENDPOINTS.MAIN} element={<QuizzPage />} />
            <Route path={ENDPOINTS.RESULT_PAGE} element={<ResultPage />} />
        </Routes>
    </>);
}

export default App;
