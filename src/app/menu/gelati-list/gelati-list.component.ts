import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { OrderListService } from 'src/app/orderList.service';
import { SundaesSizeItem } from '../models/sundaesSizeItem.model';
import { Food } from 'src/app/order/models/food.model';
import { Subscription } from 'rxjs';
import { MatExpansionPanel } from '@angular/material/expansion';


@Component({
  selector: 'app-gelati-list',
  templateUrl: './gelati-list.component.html',
  styleUrls: ['./gelati-list.component.css']
})
export class GelatiListComponent implements OnInit, OnDestroy {
  shakeList: SundaesSizeItem;
  openToppings: boolean;
  openToppingsSubscription: Subscription;
  food: string;
  price: number = 0;
  name = '';
  comments: string;
  sizeWasChosen: boolean = false;
  waterIceImage = '../../../../assets/images/waterIce.jpg';

  waterice_Gelati: SundaesSizeItem[] = [{name: 'Lemon waterice', size: [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}]}, {name: 'Pineapple waterice', size: [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}]}, {name: 'Orange Cream waterice', size: [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}]}, {name: 'Banana waterice', size: [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}]}, {name: 'Blue Rasberry waterice', size: [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}]}, {name: 'Cherry waterice', size: [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}]}, {name: 'Strawberry waterice', size: [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}]}, {name: 'Watermelon waterice', size: [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}]}, {name: 'Chocolate waterice', size: [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}]}, {name: 'Swedish Fish waterice', size: [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}]}, {name: 'Root Beer waterice', size: [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}]}, {name: 'Cotton Candy waterice', size: [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}]}];
  waterice_GelatiSizeItems: SundaesSizeItem[] = this.waterice_Gelati;


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
      this.price = 4.25;
      this.name = ' (Small)';
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
