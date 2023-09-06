import { Recipe } from "./recipe.model";
import { EventEmitter } from "@angular/core";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('First recipe', 'test', 'https://shorturl.at/diM28'),
    new Recipe('Second recipe', 'test', 'https://shorturl.at/gjIZ6')
  ]
  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }
}
