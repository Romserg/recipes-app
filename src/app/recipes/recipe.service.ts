import { Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Pizza', 'Tasty pizza', 'https://t.ly/gCe7k', [new Ingredient('Cheese', 1)]),
    new Recipe('Burger', 'Fat burger', 'https://t.ly/aPns7', [new Ingredient('Meat', 1), new Ingredient('Buns', 2)])
  ]

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes[id]
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
