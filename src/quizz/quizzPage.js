import { useEffect, useState } from "react";
import axios from 'axios';
import ENDPOINTS from "../constants/endpoints.js";
import Category from "./category.js";
import Select from 'react-select';
import { BUTTON_ID, CATEGORY_ID, CATEGORY_PLACEHOLDER, CREATE_TEXT, DIFFICULTIES, DIFFICULTY_ID, DIFFICULTY_PLACEHOLDER, MAIN_TITLE, NB_QUESTIONS, SUBMIT_TEXT } from "../constants/constants.js";
import Question from "./question.js";
import QuestionsBox from "./questionsBox.js";
import { useNavigate } from "react-router";
import TitleBar from "../utils/titleBar.js";

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

    const handleCategoryChange = (newCat) => {
        setSelectedCategory(new Category(newCat.value, newCat.label));
    };

    const handleDifficultyChange = (newDiff) => {
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
        <SelectList
            options={categories.map((a) => ({value: a.id, label: a.name}))} 
            onChangeHandler={handleCategoryChange}
            placeholder={CATEGORY_PLACEHOLDER}
            id = {CATEGORY_ID} />
        <SelectList
            options={DIFFICULTIES.map((d) => ({value: d, label: d}))}
            onChangeHandler={handleDifficultyChange}
            placeholder={DIFFICULTY_PLACEHOLDER}
            id = {DIFFICULTY_ID} />
        <button onClick={fetchQuestions}
            disabled={!(selectedCategory && difficulty)}
            id = {BUTTON_ID}>
            {CREATE_TEXT}
        </button>

        {questions.length === NB_QUESTIONS && <>
            <QuestionsBox key={questions.map(q => q.title).join('-')}
                questions={questions}
                setUserAnswers={setUserAnswers} />
                {!userAnswers.includes(null) &&
                    <button onClick={goToResults}>{SUBMIT_TEXT}</button>}
        </>}
    </>);
}

function SelectList ({options, onChangeHandler, placeholder, id}) {
    return <Select
        id = {id}
        options={options}
        onChange={onChangeHandler}
        placeholder = {placeholder}/>
}