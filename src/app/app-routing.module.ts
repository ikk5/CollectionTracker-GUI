import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CollectiblesListComponent} from './components/collectible/collectibles-list/collectibles-list.component';
import {CollectibleDetailsComponent} from './components/collectible/collectible-details/collectible-details.component';
import {AddCollectibleComponent} from './components/collectible/add-collectible/add-collectible.component';
import {CategoriesListComponent} from "./components/category/categories-list/categories-list.component";
import {AddCategoryComponent} from "./components/category/add-category/add-category.component";
import {CategoryDetailsComponent} from "./components/category/category-details/category-details.component";

const routes: Routes = [
    {path: '', redirectTo: 'collectibles', pathMatch: 'full'},
    {path: 'collectibles', component: CollectiblesListComponent},
    {path: 'collectibles/:id', component: CollectibleDetailsComponent},
    {path: 'addCollectible', component: AddCollectibleComponent},
    {path: 'categories', component: CategoriesListComponent},
    {path: 'categories/:id', component: CategoryDetailsComponent},
    {path: 'addCategory', component: AddCategoryComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
