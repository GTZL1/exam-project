import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import Question from "../quizz/question";
import QuestionsBox from "../quizz/questionsBox";
import { CORRECT_BACKGROUND, MID_BACKGROUND, NEW_QUIZ_TEXT, RESULTS_TITLE, SCORE_MESSAGE, WRONG_BACKGROUND } from "../constants/constants";
import ENDPOINTS from "../constants/endpoints";
import TitleBar from "../utils/title/titleBar";
import './resultPage.css';
import '../common.css';

export default function ResultPage() {
    const location = useLocation();

    const { userAnswers, questionsRaw } = location.state || {};
    const [questions, setQuestions] = useState(null);
    
    useEffect(() => {
        if (questionsRaw) {
            setQuestions(questionsRaw.map(qRaw =>
                new Question(qRaw.title, qRaw.correctAnswer, null, qRaw.allAnswers)));
        }
    }, [questionsRaw]);
    
    return (<>
        <TitleBar title={RESULTS_TITLE} />
        <section>
            {questions && <>
                <QuestionsBox questions={questions}
                    userAnswers={userAnswers}
                    isNotClickable={true} />
                <ScoreBox questions={questions}
                    userAnswers={userAnswers} />
            </>}
            <div>
                <Link to={ENDPOINTS.MAIN}><button>{NEW_QUIZ_TEXT}</button></Link>
            </div>
        </section>
    </>);
}

function backgroundColor(score) {
    return (score >= 4) ? CORRECT_BACKGROUND
        : ((score >=2) ? MID_BACKGROUND : WRONG_BACKGROUND)
}

function ScoreBox({questions, userAnswers}) {
    const correctCount = questions.filter((q, i) =>
        userAnswers[i] === q.correctAnswer).length;

    return <div className="scoreBox" style={{backgroundColor : backgroundColor(correctCount)}}>
        {SCORE_MESSAGE(correctCount)}
    </div>
}