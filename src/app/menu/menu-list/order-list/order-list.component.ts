import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Food } from 'src/app/order/models/food.model';
import { OrderListService } from 'src/app/orderList.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {
  subOrderList: Subscription;
  orderList: Food[];
  totalPrice: number = 0;
  subTotalPrice: Subscription;
  constructor(private orderlistService: OrderListService) { }

  ngOnInit(): void {
    this.subOrderList = this.orderlistService.getorderlistListener().
    subscribe((orderList: Food[]) => {
      this.orderList = orderList;
    });
    this.subTotalPrice = this.orderlistService.getTotalPriceListener().subscribe((totalPrice: number) => {
      this.totalPrice = totalPrice;
    });
    this.orderlistService.getOrder();
    this.orderlistService.getTotalPrice();
  }
  clearOrder() {
    this.orderlistService.clearOrder();
  }
  removeItem(index, itemPrice: number) {
    console.log('index', index);
    this.orderlistService.removeItem(index, itemPrice);
  }
  ngOnDestroy(): void {
      this.subOrderList.unsubscribe();
  }

}
