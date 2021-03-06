import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductComponent} from './product/product.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {CartComponent} from './cart/cart.component';

const routes: Routes = [
  { path: '',pathMatch: 'full', redirectTo: "products"},
  { path: 'products', component: ProductComponent},
  { path: 'shoppingCart/:id', component: ShoppingCartComponent},
  { path: 'cart', component: CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
