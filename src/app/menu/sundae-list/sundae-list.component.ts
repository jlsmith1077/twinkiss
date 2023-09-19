import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { OrderListService } from 'src/app/orderList.service';
import { SundaesSizeItem } from '../models/sundaesSizeItem.model';
import { Food } from 'src/app/order/models/food.model';
import { Subscription } from 'rxjs';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-sundae-list',
  templateUrl: './sundae-list.component.html',
  styleUrls: ['./sundae-list.component.css']
})
export class SundaeListComponent implements OnInit, OnDestroy {
  shakeList: SundaesSizeItem;
  openToppings: boolean;
  openToppingsSubscription: Subscription;
  food: string;
  price: number = 0;
  name = '';
  comments: string;
  sizeWasChosen: boolean = false;
  sundaeImage = '../../../../assets/images/sundae.jpg'

  sundaes: SundaesSizeItem[] = [{name: 'Brownie/Cookie Dough sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Cookie Dough sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Brownie sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Hot Fudge sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Strawberry sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Pineapple sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Chocolate sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Marshmallow sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Rasberry sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Cherry sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Blueberry sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Cream Dmenthe sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Dusty Road sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Caramel Walnut sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Peanut Butter sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Butter Scotch sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Funnel Cake sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}];
  sundaesSizeItem: SundaesSizeItem[] = this.sundaes;


  constructor(private orderListService: OrderListService) { }

  ngOnInit(): void {
    this.openToppings = false;
    this.openToppingsSubscription = this.orderListService.openToppingsListener().subscribe((openToppings: boolean)=> {
      this.openToppings = openToppings;
    });
    this.orderListService.getOpenToppings();
  }
  additionalComments(event) {
    this.comments = event.target.value;
  }
  addTopping(foodSelected: string) {
    switch(this.openToppings) {
      case this.openToppings === true:
        this.openToppings = false;
      break;
    }
    switch(this.openToppings) {
      case this.openToppings === false:
        this.openToppings = false;
      break;
    }
    
  }
  toggleFalse(e: boolean) {
    this.openToppings = e;
  }
  addToppings(foodselected: string) {
    const noToppings = false;
    if(this.price === 0) {
      this.price = 4.75;
      this.name = ' (Small Sundae)';
    }
    const foodSelected = foodselected + this.name;
    this.orderListService.closeToppings(foodSelected, this.price, noToppings);
    this.orderListService.updateOpenCondiments(true);
    this.orderListService.updateHandDipped(true);
    this.price = 0;
  }

  addOrderList(newItem: Food ) {
    this.openToppings = false;
  }

  sizeChosen(event: MatRadioChange) {
    if(event.value) {
      this.price = event.value.price;
      this.name = ' (' + event.value.name + ')';
    } else {
      this.price = 0;
      this.name = '';
    }
  }
  ngOnDestroy(): void {
    this.openToppingsSubscription.unsubscribe();
}
}
