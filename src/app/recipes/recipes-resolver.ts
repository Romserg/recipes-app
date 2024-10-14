import { ResolveFn } from "@angular/router";
import { Recipe } from "./recipe.model";
import { Observable, of } from "rxjs";
import { inject } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";


export const RecipesResolver: ResolveFn<Recipe[]> = (): Observable<Recipe[]> => {
  const recipeService = inject(RecipeService);
  const dataStorageService = inject(DataStorageService);

  const recipes = recipeService.getRecipes();

  return recipes.length === 0
    ? dataStorageService.fetchRecipes()
    : of(recipes)
}