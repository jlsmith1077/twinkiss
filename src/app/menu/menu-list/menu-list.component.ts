import { Component, Input, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { Food } from 'src/app/order/models/food.model';
import { Foods } from '../models/foods.model';
import { MenuItems } from '../models/menu.model';
import { OrderListService } from 'src/app/orderList.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { ShakeSizeItem } from '../models/shakeSizeItem.model';


@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit, OnDestroy {
  price: number = 0;
  checkOrderList: boolean = false;
  subOrderlistService: Subscription;
  openCondimentsSubscription: Subscription;
  @Output() openCondiments: boolean = false;
  @Input() menuList: MenuItems;
  orderList: Food[] = [];
  food: string;
  temporaryFood: string;
  subOrderList: Subscription;
  showCondimentsPage: boolean = true;
  comments: string;
  @ViewChild('panel1') firstPanel: MatExpansionPanel;  
  constructor(private orderListService: OrderListService) { }

  ngOnInit(): void {
    this.openCondimentsSubscription = this.orderListService.openCondimentsListener().subscribe((openCondiments: boolean)=> {
      this.openCondiments = openCondiments;
    });
    this.orderListService.getOpenCondiments();
  }

  toggleFalse(e: boolean) {
    this.openCondiments = e;
  }

  addOrderList(newItem: Food) {
    this.openCondiments = false;
  }

  addCondiments(foodSelected: string, price: number, description: string, foodGroup: string) {
    this.food = foodSelected;
    let noToppings: boolean = false;
    if(foodGroup === 'Additional Items') {
      noToppings = true;
      this.orderListService.updateOpenCondiments(true);
      this.orderListService.closeCondiments(price, foodSelected, description, noToppings);
    } else {
      noToppings = false;
      this.orderListService.closeCondiments(price, foodSelected, description, noToppings); 
    }
    this.orderListService.updateTemporaryFood(this.food);
    this.orderListService.updateHandDipped(false);
    this.food = '';
  }

  additionalComments(event) {
    this.comments = event.target.value;
  }
  checkorderList() {
    this.checkOrderList = true;
  }

  ngOnDestroy(): void {
    this.openCondimentsSubscription.unsubscribe();
  }

}
