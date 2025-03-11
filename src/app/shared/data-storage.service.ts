import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from "rxjs";

@Injectable({ providedIn: 'root' })

export class DataStorageService {
  baseUrl = 'https://recipes-88824-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) {
  }

  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http.put(this.baseUrl, recipes)
      .subscribe(res => console.log(res))
  }

  fetchRecipes() {

    return this.http.get<Recipe[]>(this.baseUrl)
      .pipe(
        map(
          (recipes: Recipe[]) => {
            return recipes.map((recipe: Recipe) => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : []
              };
            })
          }),
        tap(res => this.recipeService.setRecipes(res))
      )
  }
}