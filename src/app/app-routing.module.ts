import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import {
  RecipeStartComponent
} from "./recipes/recipe-start/recipe-start.component";
import {
  RecipeDetailComponent
} from "./recipes/recipe-detail/recipe-detail.component";
import {
  RecipeEditComponent
} from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesResolver } from "./recipes/recipes-resolver";
import { AuthComponent } from "./auth/auth.component";
import { authGuard } from "./auth/auth.guard";

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolver]
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolver]
      }
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
