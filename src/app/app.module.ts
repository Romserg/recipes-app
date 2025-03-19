import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import {
  RecipeDetailComponent
} from './recipes/recipe-detail/recipe-detail.component';
import {
  RecipeListComponent
} from './recipes/recipe-list/recipe-list.component';
import {
  RecipeItemComponent
} from './recipes/recipe-list/recipe-item/recipe-item.component';
import {
  ShoppingEditComponent
} from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { AppRoutingModule } from "./app-routing.module";
import {
  RecipeStartComponent
} from './recipes/recipe-start/recipe-start.component';
import {
  RecipeEditComponent
} from './recipes/recipe-edit/recipe-edit.component';
import { RecipeService } from "./recipes/recipe.service";
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi
} from "@angular/common/http";
import { AuthComponent } from "./auth/auth.component";
import { LoaderComponent } from './shared/loader/loader.component';
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { AlertComponent } from "./shared/alert/alert.component";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    RecipesComponent,
    ShoppingListComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    ShoppingEditComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    LoaderComponent
  ],
  bootstrap: [AppComponent],
  imports: [BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule, AlertComponent],
  providers: [
    ShoppingListService,
    RecipeService,
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class AppModule { }
