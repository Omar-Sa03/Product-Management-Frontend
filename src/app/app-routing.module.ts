import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AddProductComponent } from './modules/add-product/add-product.component';

const routes: Routes = [
  {
    path : '',
    component : DashboardComponent
  },
  {
    path: 'add-perfume',
    component: AddProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
