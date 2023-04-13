import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";

import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CollectibleDetailsComponent} from './components/collectible/collectible-details/collectible-details.component';
import {CollectiblesListComponent} from './components/collectible/collectibles-list/collectibles-list.component';
import {CategoriesListComponent} from "./components/category/categories-list/categories-list.component";
import {UpdateCategoryComponent} from "./components/category/crud-category/update-category.component";
import {CategoryDetailsComponent} from "./components/category/category-details/category-details.component";
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
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule
  ],
  providers: [CategoriesListComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
