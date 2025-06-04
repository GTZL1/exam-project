const ENDPOINTS = {
    'MAIN' : '/exam-project',
    'RESULT_PAGE' : '/results',
    'CATEGORIES': 'https://opentdb.com/api_category.php',
    'QUESTIONS': (amount, category, difficulty) =>
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
};

Object.freeze(ENDPOINTS);
export default ENDPOINTS;