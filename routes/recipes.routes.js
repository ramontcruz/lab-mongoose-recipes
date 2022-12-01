import express from "express";
import RecipesModel from "../models/Recipe.model.js";

const router = express.Router();

router.get("/", async(request,response)=>{
    try {
        const recipes = await RecipesModel.find();
        return response.status(200).json(recipes);
    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Algo está errado!"});
    }
    
});

router.get("/:id", async(request,response)=>{
    try {
        const { id } = request.params;
        const recipes = await RecipesModel.findById(id);

        if(!recipes)
            return response.status(404).json({msg: "Usuário não encontrado!"});

        return response.status(200).json(recipes);
    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Algo está errado!"});
    }
    
});

router.post("/create",async(request,response)=>{
    try{
        const newRecipe = await RecipesModel.create(request.body);
       
        return response.status(201).json(newRecipe);
    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Algo está errado!"});
    }
   
});

router.put("/edit/:id", async(request, response) => {
    // seta o id como parâmetro
    try{
        const { id } = request.params;

        const update = await RecipesModel.findByIdAndUpdate(
            id,
            {...request.body},
            { new: true, runValidators:true}
        );

        return response.status(200).json(update);
    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Algo está errado!"});
    }

  });

router.delete("/delete/:id",async(request,response)=>{

    try{
        const { id } = request.params;

        const deleteEmployee = await RecipesModel.findByIdAndDelete(id);

        return response.status(200).json(deleteEmployee);

    } catch (error) {
        console.log(error);
        return response.status(500).json({msg: "Algo está errado!"});
    }
});

export default router;