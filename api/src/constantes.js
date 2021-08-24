require('dotenv').config();

const BASE_URL = 'https://api.spoonacular.com';
const RECIPE_URL = BASE_URL + '/recipes/complexSearch';
const RECIPE_ID_URL = BASE_URL + '/recipes';
const DIET_URL = BASE_URL + '/types';

module.exports = {
    BASE_URL,
    RECIPE_URL,
    RECIPE_ID_URL,
    DIET_URL
}



