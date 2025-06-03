import React, { useEffect, useState } from "react";
import axios from 'axios';
import ENDPOINTS from "../constants/endpoints";
import Category from "./category.js";
import Select from 'react-select';
import { DIFFICULTIES } from "../constants/constants.js";

export default function MainPage() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [difficulty, setDifficulty] = useState(null);

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

    const handleCategoryChange = (newCat) => {
        setSelectedCategory(new Category(newCat.value, newCat.label));
    };

    const handleDifficultyChange = (newDiff) => {
        setDifficulty(newDiff.label);
    };

    return (<>
        <h2>Quizz Maker</h2>
        <SelectList
            options={categories.map((a) => ({value: a.getId(), label: a.getName()}))} 
            currentValue={selectedCategory !== null ? selectedCategory.getName() : null}
            onChangeHandler={handleCategoryChange}
            placeholder='Select a category'
            id = 'categorySelect' />
        <SelectList
            options={DIFFICULTIES.map((d) => ({value: d, label: d}))}
            currentValue={difficulty}
            onChangeHandler={handleDifficultyChange}
            placeholder='Select difficulty'
            id =' difficultySelect' />
    </>);
}

function SelectList ({options, currentValue, onChangeHandler, placeholder, id}) {
    return <Select
        {...(currentValue !== null ?
            {value: ({value : currentValue, label : currentValue})} : {})}
        id = {id}
        options={options}
        onChange={onChangeHandler}
        placeholder = {placeholder}
        required="true"
        className="basic-select"
        classNamePrefix="select"
        menuPortalTarget={document.body} />
}