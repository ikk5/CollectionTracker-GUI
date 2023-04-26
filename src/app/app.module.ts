import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CollectibleDetailsComponent} from './components/collectible/collectible-details/collectible-details.component';
import {CollectiblesListComponent} from './components/collectible/collectibles-list/collectibles-list.component';
import {UpdateCategoryComponent} from "./components/category/crud-category/update-category.component";
import {PickCategoryComponent} from "./components/collectible/crud-collectible/pick-category.component";
import {UpdateCollectibleComponent} from "./components/collectible/crud-collectible/update-collectible.component";
import {httpInterceptorProviders} from "./helpers/auth.interceptor";
import {LoginComponent} from "./components/user/login.component";
import {RegisterComponent} from "./components/user/register.component";
import {ProfileComponent} from "./components/user/profile.component";
import {HomeComponent} from "./components/home.component";
import {CollectionOverviewComponent} from "./components/collectible/collection/collection-overview.component";
import {AngularMaterialModule} from "./material.module";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DatePipe} from "@angular/common";
import {ImportComponent} from "./components/import/import.component";


@NgModule({
  declarations: [
    AppComponent,
    CollectibleDetailsComponent,
    CollectiblesListComponent,
    UpdateCategoryComponent,
    PickCategoryComponent,
    UpdateCollectibleComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    CollectionOverviewComponent,
    ImportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [httpInterceptorProviders,
    DatePipe,
    {provide: MAT_DATE_LOCALE, useValue: 'nl-NL'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {
      provide: MAT_DATE_FORMATS, useValue: {
        parse: {dateInput: 'DD-MM-YYYY'},
        display: {
          dateInput: 'DD-MM-YYYY',
          monthYearLabel: 'MM-YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MM-YYYY'
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
