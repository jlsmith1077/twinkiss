import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { OrderListService } from 'src/app/orderList.service';
import { Food } from 'src/app/order/models/food.model';
import { Subscription } from 'rxjs';
import { SundaesSizeItem } from '../models/sundaesSizeItem.model';

@Component({
  selector: 'app-artic-swirl-list',
  templateUrl: './artic-swirl-list.component.html',
  styleUrls: ['./artic-swirl-list.component.css']
})
export class ArticSwirlListComponent implements OnInit, OnDestroy {
  openToppings: boolean;
  openToppingsSubscription: Subscription;
  food: string;
  price: number = 0;
  name = '';
  comments: string;
  sizeWasChosen: boolean = false;
  articSwirlImage = '../../../../assets/images/milkshakes.jpg';

  arctic_swirls: SundaesSizeItem[] = [{name: 'Arctic Swirl Chocolate Chip Cookie Dough', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Arctic Swirl  M&Ms', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Arctic Swirl Snickers', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Arctic Swirl Oreos', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Arctic Swirl Heath Bar', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Arctic Swirl Peanut Butter Cup', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}];
  arctic_swirlSizeItems: SundaesSizeItem[] = this.arctic_swirls;

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
      this.name = ' (Small Artic Swirl)';
    }
    this.orderListService.updateOpenCondiments(true);
    const foodSelected = foodselected + this.name;
    this.orderListService.closeToppings(foodSelected, this.price, noToppings);
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
