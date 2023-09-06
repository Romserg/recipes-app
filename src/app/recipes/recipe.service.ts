import { Recipe } from "./recipe.model";

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('First recipe', 'test', 'https://shorturl.at/diM28'),
    new Recipe('Second recipe', 'test', 'https://shorturl.at/gjIZ6')
  ]
  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }
}
