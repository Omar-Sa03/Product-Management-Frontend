import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AddProductComponent } from './modules/add-product/add-product.component';
import { AboutComponent } from './modules/about/about.component';


const routes: Routes = [
  {
    path : '',
    component : DashboardComponent
  },
  {
    path: 'add-perfume',
    component: AddProductComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
