const { v4: uuidv4 } = require('uuid');

// CRUD FROM DataBase
class ModelCrud {
    constructor(model) { 
        this.model = model;
    };       
    getAll = (req, res, next) => { 
        return this.model.findAll()
            .then(results => res.send(results))
            .catch((err) => next(err));
    };

    getByIdParams = (req, res, next) => { 
        const id = req.params.id;
        return this.model.findByPk(id)
            .then((result) => res.send(result))
            .catch((err) => next(err));
    };

    delete = (req, res, next) => {  // Delete recipe by req.body.id
        const id = req.body.id;
        return this.model.destroy({
            where: {
                id
            }
        })
        .then(() => res.sendStatus(200))
        .catch((err) => next(err));
    };

    post = (req, res, next) => { 
        const body = req.body;
        return this.model.create({
            ...body, 
            id: uuidv4()
        })
        .then(() => res.send())
        .catch((err) => next(err));
    }
}
module.exports = ModelCrud;

//FutureRandom?
// getAll = (req, res, next) => { 
//     let myRecipes = this.model.findAll();
//     let apiRecipes = axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${apiKey}&number=2`)
//     Promise.all([myRecipes, apiRecipes])
//     .then((results) => {
//         let [myRecipesResults, apiRecipesResults] = results;
//         // console.log(apiRecipesResults.data)
//         let apiRecipesEndResults = apiRecipesResults.data.results.map((e)=> {
//             return {
//                 title: e.title,
//                 diets: e.diets.map((e)=>{
//                     return {diet:e}
//                 }),
//                 image: e.image,
//                 summary: e.summary,
//                 healthScore: parseInt(e.healthScore),
//                 spoonacularScore: parseInt(e.spoonacularScore),
//             }
//         })
//         const response = myRecipesResults.concat(apiRecipesEndResults);
//         res.send(response);
//     })
//     .catch((err) => next(err));
// };






