import Utils from "../utils/utils";

class Question {
    #title;
    #correctAnswer;
    #incorrectAnswers;
    #allAnswers;

    constructor(title, correctAnswer, incorrectAnswers, allAnswers = null) {
        this.#title = Utils.decodeHtmlEntities(title);
        this.#correctAnswer = Utils.decodeHtmlEntities(correctAnswer);
        this.#incorrectAnswers = incorrectAnswers ?
            incorrectAnswers.map((wa) => Utils.decodeHtmlEntities(wa)) : [];
        this.#allAnswers = allAnswers ? allAnswers :
            this.#concatenateAndShuffleAnswers([...this.#incorrectAnswers, this.#correctAnswer]);
    }

    get title() {
        return this.#title;
    }

    get correctAnswer() {
        return this.#correctAnswer;
    }

    get incorrectAnswers() {
        return this.#incorrectAnswers;
    }

    get allAnswers() {
        return this.#allAnswers;
    }

    #concatenateAndShuffleAnswers(answers) {
        for (let x = answers.length - 1; x > 0; x--) {
            const y = Math.floor(Math.random() * (x + 1));
            [answers[x], answers[y]] = [answers[y], answers[x]];
        }
        return answers;
    }
}

export default Question;