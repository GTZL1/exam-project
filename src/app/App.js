import { Route, Routes } from "react-router";
import ENDPOINTS from "../constants/endpoints";
import MainPage from "../home/mainPage";

function App() {
    return (<>
        <Routes>
            <Route path={ENDPOINTS.MAIN} element={<MainPage />} />
        </Routes>
    </>);
}

export default App;
