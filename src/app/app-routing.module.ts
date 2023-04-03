import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectiblesListComponent } from './components/collectibles-list/collectibles-list.component';
import { CollectibleDetailsComponent } from './components/collectible-details/collectible-details.component';
import { AddCollectibleComponent } from './components/add-collectible/add-collectible.component';

const routes: Routes = [
    { path: '', redirectTo: 'collectibles', pathMatch: 'full' },
    { path: 'collectibles', component: CollectiblesListComponent },
    { path: 'collectibles/:id', component: CollectibleDetailsComponent },
    { path: 'add', component: AddCollectibleComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
