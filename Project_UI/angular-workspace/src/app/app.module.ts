/**
 * ///////////////////////////////////////////////////////////////////////////////////////////////////////
 *  FILE : app.module.ts
 *  AUTHOR :  Pranav Sehgal 
 *            + Auto-generated on ng create
 *            + Auto-Editied on ng generate
 *  DESCRIPTION : Used to handle angular imports, exports and bindings.
 //////////////////////////////////////////////////////////////////////////////////////////////////////*/

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ViewTemplateComponent } from './components/Template/view-template/view-template.component';
import { CreateTemplateComponent } from './components/Template/create-template/create-template.component';
import { EditTemplateComponent } from './components/Template/edit-template/edit-template.component';
import { ViewtemplateComponent } from './components/Template/viewtemplate/viewtemplate.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewTemplateComponent,
    CreateTemplateComponent,
    EditTemplateComponent,
    ViewtemplateComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {

}
