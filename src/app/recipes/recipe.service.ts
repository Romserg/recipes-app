import { EventEmitter, Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('Pizza', 'Tasty pizza', 'https://shorturl.at/hlwZ2', [new Ingredient('Cheese', 1)]),
    new Recipe('Burger', 'Fat burger', 'https://shorturl.at/ntAQ3', [new Ingredient('Meat', 1), new Ingredient('Buns', 2)])
  ]

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
