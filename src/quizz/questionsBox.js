import React, {useState } from "react";
import { CORRECT_BACKGROUND, WRONG_BACKGROUND } from "../constants/constants";

export default function QuestionsBox({questions, userAnswers = [], setUserAnswers = () => {}, isNotClickable = false}) {
    return (<>
        {questions.map((question, index) => <div key={index}>
            <p>{question.title}</p>
            <div>
                <Answers answers={question.allAnswers}
                    userAnswers={userAnswers}
                    setUserAnswers={setUserAnswers}
                    correctAnswer={question.correctAnswer}
                    questionIndex={index}
                    isNotClickable={isNotClickable} />
            </div>
        </div>)}
    </>);
}

function Answers({answers, userAnswers, setUserAnswers, correctAnswer, questionIndex, isNotClickable}) {
    const [selected, setSelected] = useState(null);

    const onClickHandler = (answerIndex, answer) => {
        setSelected(answerIndex);
        setUserAnswers((prev) => prev.map((prevElement, index) =>
            (index === questionIndex) ? answer : prevElement));
    }

    function determineBackgroundColor(answerIndex) {
        if(userAnswers.length > 0) {
            if (answers[answerIndex] === correctAnswer) {
                return CORRECT_BACKGROUND;
            } else if (userAnswers[questionIndex] === answers[answerIndex]) {
                return WRONG_BACKGROUND;
            }
        } else {
            return (selected === answerIndex) ? CORRECT_BACKGROUND : "";
        }
    }

    return answers.map((answer, index) => (
        <button
            key={index}
            onClick={() => onClickHandler(index, answer)}
            disabled={isNotClickable}
            style={{
                backgroundColor: determineBackgroundColor(index),
                fontWeight: selected === index ? "bold" : "normal"
            }}>
            {answer}
        </button>
    ));
}