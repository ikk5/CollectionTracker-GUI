import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AddCollectibleComponent} from './components/collectible/add-collectible/add-collectible.component';
import {CollectibleDetailsComponent} from './components/collectible/collectible-details/collectible-details.component';
import {CollectiblesListComponent} from './components/collectible/collectibles-list/collectibles-list.component';
import {CategoriesListComponent} from "./components/category/categories-list/categories-list.component";
import {AddCategoryComponent} from "./components/category/add-category/add-category.component";
import {CategoryDetailsComponent} from "./components/category/category-details/category-details.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AddCollectibleComponent,
    CollectibleDetailsComponent,
    CollectiblesListComponent,
    CategoriesListComponent,
    CategoryDetailsComponent,
    AddCategoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [CategoriesListComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
