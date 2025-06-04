import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Question from "../quizz/question";

export default function ResultPage() {
    const location = useLocation();
    const { userAnswers, questionsRaw } = location.state || {};
    const [questions, setQuestions] = useState(null);
    
    useEffect(() => {
        setQuestions(questionsRaw.map(qRaw =>
            new Question(qRaw.title, qRaw.correctAnswer, null, qRaw.allAnswers)));
    }, [questionsRaw]);
    
    console.log(questions);
    return (<>
        <h2>Your results</h2>
    </>);
}