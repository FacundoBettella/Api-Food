//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, DietType } = require('./src/db.js'); //conn = sequelize
const PORT = 3001;

// Syncing all the models at once.
conn.sync({ force: true })
.then(() => { 
  console.log('Base de datos conectada!')
  server.listen(PORT, () => {
    console.log(`The server is listening at port ${PORT}`); // eslint-disable-line no-console
  
    let glutenFree = DietType.findOrCreate({
      where: {
        name: "gluten free",
      },
    });

    let ketogenic = DietType.findOrCreate({
      where: {
        name: "ketogenic",
      },
    });

    let vegetarian = DietType.findOrCreate({
      where: {
        name: "vegetarian",
      },
    });

    let lactoVegetarian = DietType.findOrCreate({
      where: {
        name: "lacto vegetarian",
      },
    });

    let ovoVegetarian = DietType.findOrCreate({
      where: {
        name: "ovo vegetarian",
      },
    });

    let vegan = DietType.findOrCreate({
      where: {
        name: "vegan",
      },
    });

    let pescetarian = DietType.findOrCreate({
      where: {
        name: "pescetarian",
      },
    });

    let paleo = DietType.findOrCreate({
      where: {
        name: "paleo",
      },
    });

    let primal = DietType.findOrCreate({
      where: {
        name: "primal",
      },
    });

    let whole = DietType.findOrCreate({
      where: {
        name: "whole 30",
      },
    });

    Promise.all([
      glutenFree,
      ketogenic,
      vegetarian,
      lactoVegetarian,
      ovoVegetarian,
      vegan,
      pescetarian,
      paleo,
      primal,
      whole
    ]).then(() => {
      console.log('DietTypes precargadas');
    })
  });
});


