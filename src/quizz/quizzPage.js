import { useEffect, useState } from "react";
import axios from 'axios';
import ENDPOINTS from "../constants/endpoints.js";
import Category from "./category.js";
import Select from 'react-select';
import { CATEGORY_PLACEHOLDER, CREATE_TEXT, DIFFICULTIES, DIFFICULTY_PLACEHOLDER, MAIN_TITLE, NB_QUESTIONS, SUBMIT_TEXT } from "../constants/constants.js";
import Question from "./question.js";
import QuestionsBox from "./questionsBox.js";
import { useNavigate } from "react-router";
import TitleBar from "../utils/title/titleBar.js";
import './quizzPage.css';
import '../common.css';

export default function QuizzPage() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState(Array(NB_QUESTIONS).fill(null));

    useEffect(() => {
        axios
            .get(`${ENDPOINTS.CATEGORIES}`)
            .then((response) => {
                setCategories(response.data.trivia_categories.map((c) =>
                    new Category(c.id, c.name)));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        setUserAnswers(Array(NB_QUESTIONS).fill(null));
    }, [questions]);

    function fetchQuestions() {
        axios
            .get(ENDPOINTS.QUESTIONS(NB_QUESTIONS, selectedCategory.id, difficulty.toLowerCase()))
            .then((response) => {
                setQuestions(response.data.results.map((q) =>
                    new Question(q.question, q.correct_answer, q.incorrect_answers)));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleCategoryChange(newCat) {
        setSelectedCategory(new Category(newCat.value, newCat.label));
    };

    function handleDifficultyChange(newDiff) {
        setDifficulty(newDiff.label);
    };

    function goToResults() {
        navigate(ENDPOINTS.RESULT_PAGE, {
            state: {
                userAnswers,
                questionsRaw: questions.map(question => ({
                    title: question.title,
                    correctAnswer: question.correctAnswer,
                    allAnswers: question.allAnswers})
            )}
        });
    }
    
    return (<>
        <TitleBar title={MAIN_TITLE} />
        <section>
            <div className="selectLine">
                <SelectList
                    options={categories.map((a) => ({value: a.id, label: a.name}))} 
                    onChangeHandler={handleCategoryChange}
                    placeholder={CATEGORY_PLACEHOLDER}
                    id = "categorySelect" />
                <SelectList
                    options={DIFFICULTIES.map((d) => ({value: d, label: d}))}
                    onChangeHandler={handleDifficultyChange}
                    placeholder={DIFFICULTY_PLACEHOLDER}
                    id = "difficultySelect" />
                <button onClick={fetchQuestions}
                    disabled={!(selectedCategory && difficulty)}
                    id = "createBtn">
                    {CREATE_TEXT}
                </button>
            </div>

            <div className="quizzQuestions">
                {questions.length === NB_QUESTIONS &&
                    <QuestionsBox key={questions.map(q => q.title).join('-')}
                        questions={questions}
                        setUserAnswers={setUserAnswers} />}
            </div>
            
            <div className="submitButton">
                {!userAnswers.includes(null) &&
                    <button onClick={goToResults}>{SUBMIT_TEXT}</button>}
            </div>
        </section>
    </>);
}

function SelectList ({options, onChangeHandler, placeholder, id}) {
    return <Select
        id = {id}
        options={options}
        onChange={onChangeHandler}
        placeholder = {placeholder} />
}