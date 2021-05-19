import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewBasicComponent } from './view-basic/view-basic.component';
import { ViewAdvancedComponent } from './view-advanced/view-advanced.component';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'basic', 
    pathMatch: 'full' 
  },
  {
    path: 'basic', 
    component: ViewBasicComponent 
  },
  { 
    path: 'advanced', 
    component: ViewAdvancedComponent 
  },
  {
    path: '**', 
    component: PageNotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
