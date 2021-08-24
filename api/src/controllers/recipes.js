// Models --> "Objeto" que se comunica con la base de datos.
// Rutas --> Puertas de entrada a la api.
// Controlador --> Intermediario entre las rutas y nuestra base de datos. 
const { Recipe, DietType, recipe_dietType } = require('../db');
const ModelCrud = require('./index');
const { apiKey } = process.env;
const { Sequelize, Op }= require('sequelize');
const { RECIPE_URL , BASE_URL } = require('../constantes');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

class RecipeModel extends ModelCrud {
    constructor(model) {
        super (model);
    }
    getAll = async (req, res, next) => { 
        if(req.query.name) {
            try {
                //Busquemos en la base de datos.. 
                let title = req.query.name.toLowerCase().replace(/['"]+/g, '');
                // let queryName = title[0].toUpperCase() + title.slice(1);
                let dbRecipes = await this.model.findAll({
                    attributes: ['title', 'image', 'id', 'spoonacularScore'],
                    where: { 
                        title: {
                            [Op.like]: `%${title}%`
                        }   
                    },    
                    include: [{
                        model: DietType,       
                    }],
                });
                // Ahora, buscamos en la api externa..
                let apiRecipes = axios.get(`${RECIPE_URL}?query=${title}&addRecipeInformation=true&apiKey=${apiKey}&number=100`);
                Promise.all([dbRecipes, apiRecipes])
                .then((results) => {
                    let [myRecipesResults, apiRecipesResults] = results; 
                    let apiRecipesEndResults = apiRecipesResults.data.results;
                    apiRecipesEndResults.map((e)=> {
                        return {
                            title: e.title,
                            image: e.image,
                            spoonacularScore: parseInt(e.spoonacularScore)
                        }
                    })
                    const response = myRecipesResults.concat(apiRecipesEndResults);
                    res.send(response);
                })
            } catch (error) {
                console.log(error);
                res.status(500);
            }        
        }
        else{
            res.status(404).json({
                message: "Not exist a 'query=name'- on URL.",
            })
        }
    };  


    getByIdParams = async (req, res, next) => {
        let details;
        let pk = req.params.idReceta;
        // DB Id
        if(pk){
            if(pk.length > 9) {
                details = await this.model.findOne({
                    where: { 
                        id: pk,    
                    },
                    include: [{
                        model: DietType,       
                        attributes: ['id','name']
                    }],  
                })
                if(details){
                    return res.json({
                        message: "Your database detail recipe",
                        data: details,
                    })
                }
                else{
                    res.status(404).json({
                        message: "Not exist a this id recipes in the Database",
                    })
                }
            }
            // API Id
            else{
                let apiIdDetail = await axios.get(`${BASE_URL}/recipes/${pk}/information?apiKey=${apiKey}`);
                if(apiIdDetail) {
                    details = {
                        image: apiIdDetail.data.image,
                        name: apiIdDetail.data.title,
                        dishTypes: apiIdDetail.data.dishTypes,
                        diets: apiIdDetail.data.diets,
                        summary: apiIdDetail.data.summary,
                        spoonacularScore: apiIdDetail.data.spoonacularScore,
                        healthScore: apiIdDetail.data.healthScore,
                        instructions: apiIdDetail.data.instructions,
                    };
                }   
                if(details){
                    return res.json({
                        message: "Your api detail recipe",
                        data: details,
                    })
                }
            } 
        }
        else{
            res.status(404).json({
                message: "Not exist a 'req.params' in the URL.",
            })
        };
    };

    post = async(req, res, next) => {
        let { title, summary, spoonacularScore, healthScore, instructions, diets } = req.body;
    
        if(req.body.title){
            let recipe = await this.model.create({
                title,
                summary,
                spoonacularScore,
                healthScore,
                instructions,
                diets,
                id: uuidv4(),
            });

            for(let i = 0; i < diets.length; i++ ){
                try {
                    const dietBD = await DietType.findAll({
                        where: {
                            name: diets[i]
                        },
                        attributes: ['id']
                    }) 
                    recipe.addDietType(dietBD);                    
                } catch (error) {
                    console.log(error);
                }
            }
            res.status(200).json({
                message: "The recipe has been created",
                data: recipe
            }); 
        }
        else{
            res.status(404).json({message: 'Not recipe title found'})
        }
    }

    addTypeToRecipe = async (req, res, next) =>{
        const { recipeId, typeId } = req.params;
        const diet = await DietType.findByPk(typeId);
        console.log(diet);
        const recipe = await Recipe.findByPk(recipeId);
        console.log(recipe)
        const recipeDiet = await RecipeDietType.create({
            RecipeId: recipe.id,
            DietTypeId: diet.id
        })
        res.send(recipeDiet);
    }
}
const recipesController = new RecipeModel(Recipe);
module.exports = recipesController;

