import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AddCollectibleComponent} from './components/add-collectible/add-collectible.component';
import {CollectibleDetailsComponent} from './components/collectible-details/collectible-details.component';
import {CollectiblesListComponent} from './components/collectibles-list/collectibles-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCollectibleComponent,
    CollectibleDetailsComponent,
    CollectiblesListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
