import React, {useState } from "react";

export default function QuestionsBox({questions, setUserAnswers}) {
    return (<>
        {questions.map((question, index) => <div key={index}>
            <p>{question.title}</p>
            <div>
                <Answers answers={question.allAnswers}
                    setUserAnswers={setUserAnswers}
                    index={index} />
            </div>
        </div>)}
    </>);
}

function Answers({answers, setUserAnswers, index}) {
    const [selected, setSelected] = useState(null);

    const onClickHandler = (answerIndex, answer) => {
        setSelected(answerIndex);
        setUserAnswers((prev) => prev.map((item, idx) => (idx === index) ? answer : item));
    }

    return answers.map((answer, index) => (
        <button
            key={index}
            onClick={() => onClickHandler(index, answer)}
            style={{
                backgroundColor: selected === index ? "#add8e6" : "",
                fontWeight: selected === index ? "bold" : "normal"
            }}>
            {answer}
        </button>
    ));
}