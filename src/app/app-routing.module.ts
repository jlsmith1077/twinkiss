import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent  } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { CheckOutComponent } from './order/check-out/check-out.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'order', component: OrderComponent },
  { path: 'check-out', component: CheckOutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
