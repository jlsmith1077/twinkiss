import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { OrderListService } from 'src/app/orderList.service';
import { ShakeSizeItem } from '../models/shakeSizeItem.model';
import { Food } from 'src/app/order/models/food.model';
import { Subscription } from 'rxjs';
import { MatExpansionPanel } from '@angular/material/expansion';


@Component({
  selector: 'app-shake-malts',
  templateUrl: './shake-malts.component.html',
  styleUrls: ['./shake-malts.component.css']
})
export class ShakeMaltsComponent implements OnInit, OnDestroy {
  shakeList: ShakeSizeItem;
  openToppings: boolean;
  openToppingsSubscription: Subscription;
  food: string;
  price: number = 0;
  name = '';
  comments: string;
  milkshakesImage = '../../../../assets/images/milkshakes.jpg';
  sizeWasChosen: boolean = false;
  enableButton: boolean = true;
  shakes_malts: ShakeSizeItem[] = [{name: 'Vanilla shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Chocolate shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Strawberry shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Banana shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Creamsickle shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Blue Berry shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Cherry Cream Dmenthe shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Coffee shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Root Beer shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Black & White shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Rasberry shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Peanut Butter shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Mocah shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Pineapple shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}];
  shakesizeItems: ShakeSizeItem[] = this.shakes_malts;
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
      this.name = ' (Regular Shake)';
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
    this.enableButton = true;
    console.log('enable button', this.enableButton);
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
