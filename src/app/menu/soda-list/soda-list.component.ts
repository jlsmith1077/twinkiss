import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { OrderListService } from 'src/app/orderList.service';
import { ShakeSizeItem } from '../models/shakeSizeItem.model';
import { Food } from 'src/app/order/models/food.model';
import { Subscription } from 'rxjs';
import { MatExpansionPanel } from '@angular/material/expansion';
import { SodaSizeItem } from '../models/sodaSizeItem.model';

@Component({
  selector: 'app-soda-list',
  templateUrl: './soda-list.component.html',
  styleUrls: ['./soda-list.component.css']
})
export class SodaListComponent implements OnInit, OnDestroy {

  shakeList: ShakeSizeItem;
  openToppings: boolean;
  openToppingsSubscription: Subscription;
  food: string;
  price: number = 0;
  name = '';
  comments: string;
  sizeWasChosen: boolean = false;
  soda = '../../../../assets/images/soda.jpg'

  sodas: SodaSizeItem[] = [{name: 'Coke soda', size: [{name: 'Regular', price: 1.6},{name: 'Large', price: 1.75}, {name: 'Quart', price: 1.95}, {name: 'Half Gallon', price: 2.25}, {name: 'Gallon', price: 3}]}, {name:'Sprite soda',  size: [{name: 'Regular', price: 1.6},{name: 'Large', price: 1.75}, {name: 'Quart', price: 1.95}, {name: 'Half Gallon', price: 2.25}, {name: 'Gallon', price: 3}]}, {name: 'Rootbeer soda',  size: [{name: 'Regular', price: 1.6},{name: 'Large', price: 1.75}, {name: 'Quart', price: 1.95}, {name: 'Half Gallon', price: 2.25}, {name: 'Gallon', price: 3}]}, {name: 'Diet Coke',  size: [{name: 'Regular', price: 1.6},{name: 'Large', price: 1.75}, {name: 'Quart', price: 1.95}, {name: 'Half Gallon', price: 2.25}, {name: 'Gallon', price: 3}]}, {name: 'Cherry Coke', size: [{name: 'Regular', price: 1.6},{name: 'Large', price: 1.75}, {name: 'Quart', price: 1.95}, {name: 'Half Gallon', price: 2.25}, {name: 'Gallon', price: 3}]}, {name: 'Vanilla Coke',  size: [{name: 'Regular', price: 1.6},{name: 'Large', price: 1.75}, {name: 'Quart', price: 1.95}, {name: 'Half Gallon', price: 2.25}, {name: 'Gallon', price: 3}]}, {name: 'Cherry Vanilla Coke',  size: [{name: 'Regular', price: 1.6},{name: 'Large', price: 1.75}, {name: 'Quart', price: 1.95}, {name: 'Half Gallon', price: 2.25}, {name: 'Gallon', price: 3}]}, {name: 'Cherry Sprite',  size: [{name: 'Regular', price: 1.6},{name: 'Large', price: 1.75}, {name: 'Quart', price: 1.95}, {name: 'Half Gallon', price: 2.25}, {name: 'Gallon', price: 3}]}, {name: 'Rasberry Ice Tea',  size: [{name: 'Regular', price: 1.6},{name: 'Large', price: 1.75}, {name: 'Quart', price: 1.95}, {name: 'Half Gallon', price: 2.25}, {name: 'Gallon', price: 3}]}];
  sodaSizeItems: SodaSizeItem[] = this.sodas;

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
      this.price = 1.60;
      this.name = ' (Regular Soda)';
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
