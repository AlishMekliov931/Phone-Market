import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderListComponent } from './list/order-list.component';

import {orderRoutes} from './order.routing'
import { AddComponent } from './add/add.component';
import { DetailsOrderComponent } from './details/details.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(orderRoutes)
    
  ],
  declarations: [
    OrderListComponent,
    AddComponent,
    DetailsOrderComponent,
    UpdateComponent
  ],
  exports: [],
  providers: []
})
export class OrderModule { }
