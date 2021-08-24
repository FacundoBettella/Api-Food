export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL';
export const GET_DIETTYPES = 'GET_DIETTYPES';
export const SORT_BY = 'SORT_BY';
export const SORT = 'SORT';
export const FILTER_BY = 'FILTER_BY';
export const SUBMIT = 'SUBMIT';

export function getRecipes(title) {
    return function (dispatch) {
        return   fetch(`http://localhost:3001/api/recipes?name=${title}`)
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: "GET_RECIPES",
                payload: json 
            })
            console.log(json, "GET ACTION")
        })
    }
};


export function getRecipeDetail(id) {
    return function (dispatch) {
        return fetch('http://localhost:3001/api/recipes/' + id)
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: "GET_RECIPE_DETAIL",
                payload: json.data
            })
            console.log(json, "GET DETAIL ACTION")
        })
    }
}

export function getDietTypes() {
    return function(dispatch){
        return fetch('http://localhost:3001/api/types')
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: "GET_DIETTYPES",
                payload: json     
            })
        })
    }
}

export function sortRecipe(payload) { //Asc Desc
    return {
        type: "SORT_BY",
        payload: payload // asc o desc
    };
};

export function sortRecipeScore(payload) {
    return {
        type: "SORT",
        payload: payload // SpoonacularScore
    }
};

export function filterBy (payload) { //Diet
    return {
        type: "FILTER_BY",
        payload: payload 
    };
};

export function submit (payload) { //Post
    return  {
            type: "SUBMIT",
            payload: payload, 
    }
}  
    

