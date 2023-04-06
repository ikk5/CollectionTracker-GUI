import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CollectibleDetailsComponent} from './components/collectible/collectible-details/collectible-details.component';
import {CollectiblesListComponent} from './components/collectible/collectibles-list/collectibles-list.component';
import {CategoriesListComponent} from "./components/category/categories-list/categories-list.component";
import {UpdateCategoryComponent} from "./components/category/crud-category/update-category.component";
import {CategoryDetailsComponent} from "./components/category/category-details/category-details.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PickCategoryComponent} from "./components/collectible/crud-collectible/pick-category.component";
import {UpdateCollectibleComponent} from "./components/collectible/crud-collectible/update-collectible.component";

@NgModule({
  declarations: [
    AppComponent,
    CollectibleDetailsComponent,
    CollectiblesListComponent,
    CategoriesListComponent,
    CategoryDetailsComponent,
    UpdateCategoryComponent,
    PickCategoryComponent,
    UpdateCollectibleComponent
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
