/** ///////////////////////////////////////////////////////////////////////////////////////////////////////
 *  FILE : app-routing.module.ts
 *  AUTHOR : Pranav Sehgal
 *           + Auto-generated on ng create if angular routing is selected
 *  DESCRIPTION : USED to select component to display within index.html
 *                CHANGES bases on URL path
 ///////////////////////////////////////////////////////////////////////////////////////////////////////*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewtemplateComponent } from './components/Template/viewtemplate/viewtemplate.component';
import { ViewTemplateComponent } from './components/Template/view-template/view-template.component';
import { EditTemplateComponent } from './components/Template/edit-template/edit-template.component';
import { CreateTemplateComponent } from './components/Template/create-template/create-template.component';
import { Template } from './model/Template';

const routes: Routes = [
  { path: '', redirectTo: '/templates/view', pathMatch: 'full' },

  { path:'templates/view', component:ViewTemplateComponent },
  { path:'templates/edit', component:EditTemplateComponent },
  { path:'templates/create', component:CreateTemplateComponent},
  { path:'templates/viewtemplate', component:ViewtemplateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }