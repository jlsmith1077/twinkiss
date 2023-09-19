import { Component, Input, OnInit, OnDestroy ,ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { OrderListService } from 'src/app/orderList.service';
import { SlushieSizeItem } from '../models/slushieSizeItems.model';
import { Food } from 'src/app/order/models/food.model';
import { Subscription } from 'rxjs';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-slushies-list',
  templateUrl: './slushies-list.component.html',
  styleUrls: ['./slushies-list.component.css']
})
export class SlushiesListComponent implements OnInit, OnDestroy {
  shakeList: SlushieSizeItem;
  openToppings: boolean;
  openToppingsSubscription: Subscription;
  food: string;
  price: number = 0;
  name = '';
  comments: string;
  sizeWasChosen: boolean = false;
  slushieImage =  '../../../../assets/images/slushie.jpg';

  slushies: SlushieSizeItem[] = [{name: 'Lime Slushie', size: [{name: 'Small', price: 1.9}, {name: 'Large', price: 2}, {name: 'Quart', price: 2.15}]}, {name: 'Pineapple Slushie', size: [{name: 'Small', price: 1.9}, {name: 'Large', price: 2}, {name: 'Quart', price: 2.15}]}, {name: 'Rasberry Slushie', size: [{name: 'Small', price: 1.9}, {name: 'Large', price: 2}, {name: 'Quart', price: 2.15}]}, {name: 'Orange Slushie', size: [{name: 'Small', price: 1.9}, {name: 'Large', price: 2}, {name: 'Quart', price: 2.15}]}, {name: 'Grape Slushie', size: [{name: 'Small', price: 1.9}, {name: 'Large', price: 2}, {name: 'Quart', price: 2.15}]}, {name: 'Cherry Slushie', size: [{name: 'Small', price: 1.9}, {name: 'Large', price: 2}, {name: 'Quart', price: 2.15}]}, {name: 'Lemon Slushie', size: [{name: 'Small', price: 1.9}, {name: 'Large', price: 2}, {name: 'Quart', price: 2.15}]}];
  slushiesSizeItem: SlushieSizeItem[] = this.slushies;


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
    const noToppings = true;
    if(this.price === 0) {
      this.price = 2;
      this.name = ' (Large Slushie)';
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
