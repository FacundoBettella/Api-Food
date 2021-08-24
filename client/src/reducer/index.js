import { GET_RECIPES, GET_RECIPE_DETAIL, GET_DIETTYPES, SORT_BY, SORT, FILTER_BY, SUBMIT } from "../actions";
const axios = require('axios');

// let recipe =  [
//     {title: "banana", spoonacularScore: 4, diet:[{name:"vegan"}, {name: "meat"}]},
//     {title: "manzana", spoonacularScore: 7.5, diet:[{name:"ovnivor"}]},
//     {title: "AnaspoonacularScore: 9, diet:[{name:"meat"}]},
//     {title:na",  "naranja", spoonacularScore: 7, diet:[{name:"vegan"}]}
// ]

function sortAsc(arr, orderType) {
    return arr.sort(function (a, b) {
        if (a[orderType] > b[orderType]) {
        return 1;
    }
        if (a[orderType] < b[orderType]) {
        return -1;
    }
    return 0;
    });
};

function sortDesc(arr, orderType) {
    return arr.sort(function (a, b) {
        if (a[orderType] < b[orderType]) {
            return 1;
        }
        if (a[orderType] > b[orderType]) {
            return -1;
        }
        return 0;    
    });
};

function filterBy(arr, field) {
    let filteredArr=[]
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr[i].diet.length;j++){
            if(arr[i].diet[j].name.includes(field)){
                filteredArr.push(arr[i])
            }
        }
    };
    return filteredArr;
};

// REDUCER -----------------------------------------------------------------------------------

let initialState = {
    recipesLoaded: [],
    recipeDetail: {},
    diets: [],
    filtered: ' ',
    submit: ' ',
}

function reducer(state = initialState, action) {
    if(action.type === GET_RECIPES) {
        return {
            ...state,
            recipesLoaded: action.payload,
        };
    };
    if(action.type === GET_RECIPE_DETAIL) {
        return {
            ...state,
            recipeDetail: action.payload,
        };
    };
    if(action.type === GET_DIETTYPES){
        return {
            ...state,
            diets: action.payload,
        };
    };    
    if(action.type === SORT_BY) { //Asc, desc
        let sortedRecipes = action.payload === 'ascendente' ? 
        sortAsc(state.recipesLoaded, 'title') :
        sortDesc(state.recipesLoaded, 'title');
        return {
            ...state,
            recipesLoaded: sortedRecipes
        }
    };
    if(action.type === SORT) { //spoonacularScore
        let sortScore = action.payload === 'ascendente' ? 
        sortAsc(state.recipesLoaded, 'spoonacularScore'):
        sortDesc(state.recipesLoaded, 'spoonacularScore')
        return {
            ...state,
            recipesLoaded: sortScore
        }
    };
    if(action.type === FILTER_BY) { //Diet
        return {
            ...state,
            filtered:action.payload ==='reset' ? ' ' : state.filtered = action.payload,
            recipesLoaded:filterBy(state.recipesLoaded, action.payload),
        };  
    };
    if(action.type === SUBMIT) { 
        axios.post('http://localhost:3001/api/create', action.payload)
        return {
            ...state,
            submit: 'Your recipe has been created succesfully'
        }
    }
    return state; 
}
export default reducer;