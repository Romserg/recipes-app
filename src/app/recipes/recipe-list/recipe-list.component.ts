import { Component, OnInit } from '@angular/core';
import { Recipe } from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{
  recipes: Recipe[] = [
    new Recipe('test', 'test', 'https://shorturl.at/diM28'),
    new Recipe('test', 'test', 'https://shorturl.at/gjIZ6')
  ]
  constructor() {
  }

  ngOnInit() {

  }
}
