class Question {
    #title;
    #correctAnswer;
    #incorrectAnswers;
    #allAnswers;

    constructor(title, correctAnswer, incorrectAnswers) {
        this.#title = title;
        this.#correctAnswer = correctAnswer;
        this.#incorrectAnswers = incorrectAnswers;
        this.#allAnswers = this.#concatenateAndShuffleAnswers([...this.#incorrectAnswers, this.#correctAnswer]);
    }

    get title() {
        return this.#title;
    }

    get correctAnswers() {
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