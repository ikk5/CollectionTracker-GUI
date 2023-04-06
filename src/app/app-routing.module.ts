import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CollectiblesListComponent} from './components/collectible/collectibles-list/collectibles-list.component';
import {CollectibleDetailsComponent} from './components/collectible/collectible-details/collectible-details.component';
import {CategoriesListComponent} from "./components/category/categories-list/categories-list.component";
import {UpdateCategoryComponent} from "./components/category/crud-category/update-category.component";
import {CategoryDetailsComponent} from "./components/category/category-details/category-details.component";
import {PickCategoryComponent} from "./components/collectible/crud-collectible/pick-category.component";
import {UpdateCollectibleComponent} from "./components/collectible/crud-collectible/update-collectible.component";

const routes: Routes = [
    {path: '', redirectTo: 'collectibles', pathMatch: 'full'},
    {path: 'collectibles', component: CollectiblesListComponent},
    {path: 'collectibles/:id', component: CollectibleDetailsComponent},
    {path: 'categories', component: CategoriesListComponent},
    {path: 'categories/:id', component: CategoryDetailsComponent},
    {path: 'addCategory', component: UpdateCategoryComponent},
    {path: 'pickCategory', component: PickCategoryComponent},
    {path: 'updateCollectible', component: UpdateCollectibleComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
