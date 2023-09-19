import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { OrderListService } from 'src/app/orderList.service';
import { IcecreamSizeItem } from '../models/icecreamSizeItem.model';
import { Food } from 'src/app/order/models/food.model';
import { Subscription } from 'rxjs';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-icecream-list',
  templateUrl: './icecream-list.component.html',
  styleUrls: ['./icecream-list.component.css']
})
export class IcecreamListComponent implements OnInit, OnDestroy {

  shakeList: IcecreamSizeItem;
  openToppings: boolean;
  openToppingsSubscription: Subscription;
  food: string;
  price: number = 0;
  name = '';
  comments: string;
  sizeWasChosen: boolean = false;
  iceCreamImage = '../../../../assets/images/icecream.jpg';

  icecream: IcecreamSizeItem[] = [{name: 'Vanilla icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Strawberry icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Butter Pecan icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Mint Chocolate Chip icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Cookies & Cream icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Chocolate Chip Cookie Dough icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Penut Butter Cup icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Double Fudge Brownie icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Sweet and Salty Caramel Pretzel icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Birthday Cake icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Chocolate Penut Butter Cup icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Banana icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Black Cherry icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Pumpkin Pie icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Strawberry Shortcake icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Coffee icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Rocky Road icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Red Velvet Cake icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Bananna Split icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Strawberry Cheesecake icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Blueberry Cheesecake icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]} ];
  icecreamsizeItems: IcecreamSizeItem[] = this.icecream;


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
      this.name = ' (Medium IceCream)';
    }
    console.log('no topping in shakes n malts', noToppings);
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
      console.log('price in shakes n malts', this.price);
    } else {
      this.price = 0;
      this.name = '';
    }
  }
  ngOnDestroy(): void {
      this.openToppingsSubscription.unsubscribe()
  }
}
