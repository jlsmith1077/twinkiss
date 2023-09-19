import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { OrderListService } from 'src/app/orderList.service';
import { IcecreamSizeItem } from '../models/icecreamSizeItem.model';
import { Food } from 'src/app/order/models/food.model';
import { Subscription } from 'rxjs';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-yogurt-list',
  templateUrl: './yogurt-list.component.html',
  styleUrls: ['./yogurt-list.component.css']
})
export class YogurtListComponent implements OnInit, OnDestroy {
  shakeList: IcecreamSizeItem;
  openToppings: boolean;
  openToppingsSubscription: Subscription;
  food: string;
  price: number = 0;
  name = '';
  comments: string;
  sizeWasChosen: boolean = false;
  yogurtImage =  '../../../../assets/images/milkshakes.jpg';

  yogurt: IcecreamSizeItem[] = [{name: 'Chocolate Yogurt', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5}]}, {name: 'Toffee Crunch Yogurt', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5}]}, {name: 'Peanut Butter Yogurt', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5}]}, {name: 'Vanilla Bean Yogurt', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5}]}, {name: 'Strawberry Yogurt', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5}]}];
  yogurtSizeItem: IcecreamSizeItem[] = this.yogurt;


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
      this.price = 3.75;
      this.name = ' (Medium Yogurt)';
    }
    const foodSelected = foodselected + this.name;
    this.orderListService.closeToppings(foodSelected, this.price, noToppings);
    this.orderListService.updateOpenCondiments(true);
    this.orderListService.updateHandDipped(false);
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
