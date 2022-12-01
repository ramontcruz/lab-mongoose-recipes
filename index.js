import express from "express"
import * as dotenv from "dotenv"
import connect from "./config/db.config.js";
import Recipe from "./models/Recipe.model.js";
import recipesfile from './data.json' assert { type: 'json' };
import recipeRoute from "./routes/recipes.routes.js";
import mongoose from "mongoose";

//habilitar o servidor para ter variáveis de ambiente
dotenv.config()

//instanciar o express
const app = express()

//configurar para aceitar/enviar json
app.use(express.json())
app.use("/recipes", recipeRoute);

//conectando com o banco de dados
connect()


// o servidor subindo pro ar.
app.listen(process.env.PORT, () => {
    console.log(`App up and running on port http://localhost:${process.env.PORT}`);
  });

let recipe={
    "title":"Miojo",
    "level":"Easy Peasy",
    "ingredientes":["macarrao","agua","sal"],
    "cuisine":"classic",
    "dishType": "main_course",
    "image": "https://images.media-allrecipes.com/images/75131.jpg",
    "duration":"3",
    "creator":"Ramon"
};

Recipe.create(recipe);

Recipe.insertMany(recipesfile).then(recipes => {console.log(recipes[2].title)});

Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'},{duration: 100},{new: true, runValidators: true});

Recipe.deleteOne({title: 'Carot Cake'});
