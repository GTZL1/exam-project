import React, { useEffect, useState } from "react";
import axios from 'axios';
import ENDPOINTS from "../constants/endpoints";
import Category from "./category.js";

export default function MainPage() {
    const [categories, setCategories] = useState([]);

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

   
    return (<>
        <h2>Quizz Maker</h2>
    </>);
}