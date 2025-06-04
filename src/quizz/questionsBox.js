import React, {useState } from "react";

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
            if (userAnswers[questionIndex] === answers[answerIndex]) {
                return (userAnswers[questionIndex] === correctAnswer) ? "green" : "red";
            }
        } else {
            return (selected === answerIndex) ? "green" : "";
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