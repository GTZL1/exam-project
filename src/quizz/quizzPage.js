import React, { useEffect, useState } from "react";
import axios from 'axios';
import ENDPOINTS from "../constants/endpoints.js";
import Category from "./category.js";
import Select from 'react-select';
import { DIFFICULTIES, NB_QUESTIONS } from "../constants/constants.js";
import Question from "./question.js";

export default function QuizzPage() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const [questions, setQuestions] = useState([]);

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

    return (<>
        <h2>Quizz Maker</h2>
        <SelectList
            options={categories.map((a) => ({value: a.id, label: a.name}))} 
            currentValue={selectedCategory !== null ? selectedCategory.name : null}
            onChangeHandler={handleCategoryChange}
            placeholder='Select a category'
            id = 'categorySelect' />
        <SelectList
            options={DIFFICULTIES.map((d) => ({value: d, label: d}))}
            currentValue={difficulty}
            onChangeHandler={handleDifficultyChange}
            placeholder='Select difficulty'
            id =' difficultySelect' />
        <button onClick={fetchQuestions} disabled={!selectedCategory && !difficulty}>
            Create
        </button>
    </>);
}

function SelectList ({options, currentValue, onChangeHandler, placeholder, id}) {
    return <Select
        //{...(currentValue !== null ?
            //{value: ({value : currentValue, label : currentValue})} : {})}
        id = {id}
        options={options}
        onChange={onChangeHandler}
        placeholder = {placeholder}
        required="true"
        className="basic-select"
        classNamePrefix="select"
        menuPortalTarget={document.body} />
}