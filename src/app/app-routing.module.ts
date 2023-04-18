import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CollectiblesListComponent} from './components/collectible/collectibles-list/collectibles-list.component';
import {CollectibleDetailsComponent} from './components/collectible/collectible-details/collectible-details.component';
import {UpdateCategoryComponent} from "./components/category/crud-category/update-category.component";
import {PickCategoryComponent} from "./components/collectible/crud-collectible/pick-category.component";
import {UpdateCollectibleComponent} from "./components/collectible/crud-collectible/update-collectible.component";
import {HomeComponent} from "./components/home.component";
import {LoginComponent} from "./components/user/login.component";
import {RegisterComponent} from "./components/user/register.component";
import {ProfileComponent} from "./components/user/profile.component";
import {CollectionOverviewComponent} from "./components/collectible/collection/collection-overview.component";

const routes: Routes = [
    {path: '', redirectTo: 'categories', pathMatch: 'full'},
    {path: 'collection', component: CollectiblesListComponent},
    {path: 'collection/:user', component: CollectionOverviewComponent},
    {path: 'collectible', component: CollectibleDetailsComponent},
    {path: 'updateCategory', component: UpdateCategoryComponent},
    {path: 'pickCategory', component: PickCategoryComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'updateCollectible', component: UpdateCollectibleComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
