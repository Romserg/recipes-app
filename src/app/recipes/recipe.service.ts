import { Recipe } from "./recipe.model";
import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('Pizza', 'Tasty pizza', 'https://shorturl.at/hlwZ2', [new Ingredient('Cheese', 1)]),
    new Recipe('Burger', 'Fat burger', 'https://shorturl.at/ntAQ3', [new Ingredient('Meat', 1), new Ingredient('Buns', 2)])
  ]

  constructor() {
  }

  getRecipes() {
    return this.recipes.slice();
  }
}
