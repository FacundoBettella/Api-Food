const { DietType, Recipe } = require('../db');
const ModelCrud = require('./index');
const { Sequelize, Op }= require('sequelize');
const { v4: uuidv4 } = require('uuid');

class dietTypeModel extends ModelCrud {
    constructor(model) {
        super (model);
    }
    
    getAll = async (req, res) => {
        const dietTypes = await DietType.findAll({
            include: [{
                model: Recipe,       
                attributes: ['id']
            }]
        });
        res.status(200).send(dietTypes);
    };

    post = async (req, res, next) => { 
        const body = req.body;
        return await this.model.create({
            ...body,     
        })
        .then(() => res.send())
        .catch((err) => next(err));
    }
}
const dietTypeController = new dietTypeModel(DietType);
module.exports = dietTypeController;
