import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ShakeSizeItem } from './models/shakeSizeItem.model';
import { MenuItems } from '../menu/models/menu.model';
import { Foods } from '../menu/models/foods.model';
import { Food } from '../order/models/food.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Subscription } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';

import { OrderListService } from '../orderList.service';
import { SodaSizeItem } from './models/sodaSizeItem.model';
import { IcecreamSizeItem } from './models/icecreamSizeItem.model';
import { SundaesSizeItem } from './models/sundaesSizeItem.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  orderList: Food[] = [];
  subOrderList: Subscription;
  subOpenCondiments: Subscription;
  subopenToppings: Subscription;
  openCondiments: boolean = false;
  openToppings: boolean = false;
  showOrderList: boolean = false;
  @ViewChild('panel2') secondPanel: MatAccordion;


  constructor(private orderlistService: OrderListService,private myElement: ElementRef) {

  }
menu = [ 'Additional Items', 'Burgers & Dogs', 'Sandwiches', 'Steaks', 'Sides', 'Subs', 'Pretzels', 'Sodas', 'Ice Cream', 'Sundaes', 'Water Ice & Gelati', 'Shakes & Malts', 'Artic Swirls', 'Sherbert', 'Yogurt', 'Slushies' ];
foodChosen = ['Hamburger', 'Cheeseburger', 'Twin Cheeseburger', 'Hollywood Burger', 'Twin Hollywood Burger', 'Hot Dog', 'Cheese Dog', 'Chili Dog', 'Chili Cheese Dog'];
burgers: Foods[] = [{name: 'Hamburger', price: 3.0}, {name: 'Cheeseburger', price: 3.75}, {name: 'Twin Cheeseburger', price: 4.95}, {name: 'Hollywood Burger', price: 4.75, description: 'Lettuce, Tomato, Onions'}, {name: 'Twin Hollywood Burger', price: 5.75, description: 'Lettuce, Tomato, Onions'}, {name: 'Hot Dog', price: 2.00}, {name: 'Cheese Dog', price: 2.65}, {name: 'Chili Dog', price: 2.65}, {name: 'Chili Cheese Dog', price: 3.25}];
sandwiches = [{name: 'Rob Sandwich', price: 3.5, description: '2 cheeses, lettuce, tomatoes, mayonaise, ketchup'}, {name: 'Fish Sandwich', price: 3.25}, {name: 'Chicken Sandwich', price: 3.95}, {name: 'Grilled Cheese', price: 2.75}, {name: 'BLT', price: 4.5}];
steaks = [{name: 'Cheesesteak', price: 3.75}, {name:'Cheesesteak w/ Fried Onions', price: 4.25}, {name: 'Cheesesteak w/ Sauce', price: 4.25}, {name: 'Pepper Steak', price: 3.75}, {name: 'Pepper Cheese Steak', price: 4.5 }, {name: 'Philly Cheese Steak', price: 5.25}, {name: 'Chicken Cheese Steak', price: 5.25}];
sides = [{name: 'Onion Rings', price: 3.25}, {name: 'French Fries', price: 3.75}, {name: 'Cheese Fries', price: 4.5}, {name: 'Spicy Cross Track Fries', price: 4.5}, {name: 'Cheese Spicy Cross Track Fries', price: 4.5}, {name: 'Mozzarelli Sticks', price: 5.75}, {name: 'Potato Puffs', price: 3.75}, {name: 'Cheese Potato Puffs', price: 4.50}, {name: 'Chicken Nuggets amt(6)', price: 2.95}, {name: 'Chicken Nuggets amt(12)', price: 4.95}, {name: 'Chicken Fingers', price: 5.75}, {name: 'Chicken Fingers & Fries', price: 8.00}, {name: 'Shrimp & Fries', price: 8.00}, {name: 'Chicken Dinner', price: 8.00}]; 
//  
subs = [{name: 'Regular Sub', price: 6.95, description: 'lettuce, tomato, onion, oregano, oil'}, {name: '1/2 Regular Sub', price: 4.25, description: 'lettuce, tomato, onion, oregano, oil'}, {name: '1/2 Cheese Sub', price: 4.25, description: 'provolone cheese, american cheese, lettuce, tomato, onion, oregano, oil'}, {name: 'Cheese Sub', price: 6.95, description: 'provolone cheese, american cheese, lettuce, tomato, onion, oregano, oil'}, {name: '1/2 Cheesesteak Sub', price: 4.25, description: 'lettuce, tomato, onion, oregano, oil'}, {name: 'Cheesesteak Sub', price: 6.95, description: 'lettuce, tomato, onion, oregano, oil'},  {name: 'Italian Sub', price: 6.95, description: 'lettuce, tomato, onion, oregano, oil'}, {name: '1/2 Italian Sub', price: 4.25, description: 'lettuce, tomato, onion, oregano, oil'}, {name: '1/2 Tuna Sub', price: 4.25, description: 'lettuce, tomato, onion, oregano, oil'}, {name: 'Tuna Sub', price: 7.75, description: 'lettuce, tomato, onion, oregano, oil'}, {name: '1/2 Cheeseburger Sub', price: 5, description: 'lettuce, tomato, onion, oregano, oil'}, {name: 'Cheeseburger Sub', price: 8, description: 'lettuce, tomato, onion, oregano, oil'}, {name: '1/2 Ham & Cheese Sub', price: 5, description: 'lettuce, tomato, onion, oregano, oil'}, {name: 'Ham & Cheese Sub', price: 8, description: 'lettuce, tomato, onion, oregano, oil'}];
pretzels = [{name: '1 pretzel', price: .85}, {name: '3 pretzel', price: 2.35}, {name: '6 pretzel', price: 3.90}, {name: '12 pretzel', price: 7.50}];

sodas: SodaSizeItem[] = [{name: 'Coke soda', size: [{name: 'Regular', price: 1.6},{name: 'Large', price: 1.75}, {name: 'Quart', price: 1.95}, {name: 'Half Gallon', price: 2.25}, {name: 'Gallon', price: 3}]}, {name:'Sprite soda',  size: [{name: 'Regular', price: 1.6},{name: 'Large', price: 1.75}, {name: 'Quart', price: 1.95}, {name: 'Half Gallon', price: 2.25}, {name: 'Gallon', price: 3}]}, {name: 'Rootbeer soda',  size: [{name: 'Regular', price: 1.6},{name: 'Large', price: 1.75}, {name: 'Quart', price: 1.95}, {name: 'Half Gallon', price: 2.25}, {name: 'Gallon', price: 3}]}, {name: 'Diet Coke',  size: [{name: 'Regular', price: 1.6},{name: 'Large', price: 1.75}, {name: 'Quart', price: 1.95}, {name: 'Half Gallon', price: 2.25}, {name: 'Gallon', price: 3}]}, {name: 'Cherry Coke', size: [{name: 'Regular', price: 1.6},{name: 'Large', price: 1.75}, {name: 'Quart', price: 1.95}, {name: 'Half Gallon', price: 2.25}, {name: 'Gallon', price: 3}]}, {name: 'Vanilla Coke',  size: [{name: 'Regular', price: 1.6},{name: 'Large', price: 1.75}, {name: 'Quart', price: 1.95}, {name: 'Half Gallon', price: 2.25}, {name: 'Gallon', price: 3}]}, {name: 'Cherry Vanilla Coke',  size: [{name: 'Regular', price: 1.6},{name: 'Large', price: 1.75}, {name: 'Quart', price: 1.95}, {name: 'Half Gallon', price: 2.25}, {name: 'Gallon', price: 3}]}, {name: 'Cherry Sprite',  size: [{name: 'Regular', price: 1.6},{name: 'Large', price: 1.75}, {name: 'Quart', price: 1.95}, {name: 'Half Gallon', price: 2.25}, {name: 'Gallon', price: 3}]}, {name: 'Rasberry Ice Tea',  size: [{name: 'Regular', price: 1.6},{name: 'Large', price: 1.75}, {name: 'Quart', price: 1.95}, {name: 'Half Gallon', price: 2.25}, {name: 'Gallon', price: 3}]}];
shakes_malts: ShakeSizeItem[] = [{name: 'Vanilla shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Chocolate shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Strawberry shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Banana shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Creamsickle shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Blue Berry shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Cherry Cream Dmenthe shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Coffee shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Root Beer shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Black & White shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Rasberry shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Peanut Butter shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Mocah shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}, {name: 'Pineapple shake', size: [{name:'Regular Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}]}];
icecream: IcecreamSizeItem[] = [{name: 'Vanilla icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Strawberry icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Butter Pecan icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Mint Chocolate Chip icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Cookies & Cream icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Chocolate Chip Cookie Dough icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Penut Butter Cup icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Double Fudge Brownie icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Sweet and Salty Caramel Pretzel icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Birthday Cake icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Chocolate Penut Butter Cup icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Banana icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Black Cherry icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Pumpkin Pie icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Strawberry Shortcake icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Coffee icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Rocky Road icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Red Velvet Cake icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Bananna Split icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Strawberry Cheesecake icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]}, {name: 'Blueberry Cheesecake icecream', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5} ]} ];
sundaes: SundaesSizeItem[] = [{name: 'Brownie/Cookie Dough sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Cookie Dough sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Brownie sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Hot Fudge sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Strawberry sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Pineapple sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Chocolate sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Marshmallow sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Rasberry sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Cherry sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Blueberry sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Cream Dmenthe sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Dusty Road sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Caramel Walnut sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Peanut Butter sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Butter Scotch sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Funnel Cake sundae', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}];
slushies = [{name: 'Lime Slushie', size: [{name: 'Small', price: 1.9}, {name: 'Large', price: 2}, {name: 'Quart', price: 2.15}]}, {name: 'Pineapple Slushie', size: [{name: 'Small', price: 1.9}, {name: 'Large', price: 2}, {name: 'Quart', price: 2.15}]}, {name: 'Rasberry Slushie', size: [{name: 'Small', price: 1.9}, {name: 'Large', price: 2}, {name: 'Quart', price: 2.15}]}, {name: 'Orange Slushie', size: [{name: 'Small', price: 1.9}, {name: 'Large', price: 2}, {name: 'Quart', price: 2.15}]}, {name: 'Grape Slushie', size: [{name: 'Small', price: 1.9}, {name: 'Large', price: 2}, {name: 'Quart', price: 2.15}]}, {name: 'Cherry Slushie', size: [{name: 'Small', price: 1.9}, {name: 'Large', price: 2}, {name: 'Quart', price: 2.15}]}, {name: 'Lemon Slushie', size: [{name: 'Small', price: 1.9}, {name: 'Large', price: 2}, {name: 'Quart', price: 2.15}]}];
waterice_Gelati = [{name: 'Lemon waterice', size: [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}]}, {name: 'Pineapple waterice', size: [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}]}, {name: 'Orange Cream waterice', size: [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}]}, {name: 'Banana waterice', size: [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}]}, {name: 'Blue Rasberry waterice', size: [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}]}, {name: 'Cherry waterice', size: [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}]}, {name: 'Strawberry waterice', size: [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}]}, {name: 'Watermelon waterice', size: [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}]}, {name: 'Chocolate waterice', size: [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}]}, {name: 'Swedish Fish waterice', size: [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}]}, {name: 'Root Beer waterice', size: [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}]}, {name: 'Cotton Candy waterice', size: [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}]}];
arctic_swirls: SundaesSizeItem[] = [{name: 'Arctic Swirl Chocolate Chip Cookie Dough', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Arctic Swirl  M&Ms', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Arctic Swirl Snickers', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Arctic Swirl Oreos', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Arctic Swirl Heath Bar', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}, {name: 'Arctic Swirl Peanut Butter Cup', size: [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}]}];
sherbert: IcecreamSizeItem[] = [{name: 'Banana Sherbert', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5}]}, {name: 'Bubble Gum Sherbert', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5}]}, {name: 'Pineapple Sherbert', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5}]}, {name: 'Blue Berry Sherbert', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5}]}];
yogurt: IcecreamSizeItem[] = [{name: 'Chocolate Yogurt', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5}]}, {name: 'Toffee Crunch Yogurt', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5}]}, {name: 'Peanut Butter Yogurt', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5}]}, {name: 'Vanilla Bean Yogurt', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5}]}, {name: 'Strawberry Yogurt', size: [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5}]}];
// speacialty_Cones = ['Waffle Chocolate Jimmies', 'Waffle Rainbow Jimmies', 'Waffle Crunch Coat', ';']
root_beer_float = {name: 'Root Beer Float', price: 3.25};
ice_cream_soda = {name: 'Ice Cream Soda', price: 3.25};
glacier = {name: 'Glacier', price: 3.25 };
fudge_boat = {name: 'Fudge Boat', price: 5.50};
banana_boat = { name: 'Banana Boat', price: 5.70};
funnel_cakes = 'Funnel Cake';
chocolate_covered_bananas = 'Chocolate Covered Bananas';
ice_cream_sandwiches = {name: 'Ice Cream Sandwich', price: 1.50};
sherbert_smoothie = { name: 'Sherbert Smoothie', price: 3.75};
additional_items = [{ name: 'Sherbert Smoothie', price: 3.75}, {name: 'Ice Cream Sandwich', price: 1.50}, { name: 'Banana Boat', price: 5.70}, {name: 'Fudge Boat', price: 5.50}, {name: 'Glacier', price: 3.25 }, {name: 'Ice Cream Soda', price: 3.25}, {name: 'Root Beer Float', price: 3.25},
//  this.funnel_cakes, this.root_beer_float.name, this.chocolate_covered_bananas
];
burgerImage = '../../../assets/images/burgersdogs.jpg';
sandwichImage = '../../../assets/images/blt.jpg';
cheesesteakImage = '../../../assets/images/cheesesteak.jpg';
mozzysticksImage = '../../../assets/images/mozzysticks.jpg';
pretzelImage = '../../../assets/images/pretzel.jpg';
subsImage = '../../../assets/images/subs.jpeg';
icecreamsandwichImage = '../../../assets/images/icecreamsandwich.png';
menuItem: MenuItems[] = [{name: 'Burgers & Hot Dogs', foods: this.burgers, image: this.burgerImage},
                  {name: 'Sandwiches', foods: this.sandwiches, image: this.sandwichImage},
                  {name: 'Subs', foods: this.subs, image: this.subsImage},
                  {name: 'Steaks', foods: this.steaks, image: this.cheesesteakImage},
                  {name: 'Additional Items', foods: this.additional_items, image: this.icecreamsandwichImage},
                  {name: 'Sides', foods: this.sides, image: this.mozzysticksImage},
                  {name: 'Pretzels', foods: this.pretzels, image: this.pretzelImage}
];

shakesizeItems: ShakeSizeItem[] = this.shakes_malts;

  

  ngOnInit(): void {
    this.subOrderList = this.orderlistService.getorderlistListener().
    subscribe((orderList: Food[]) => {
      this.orderList = orderList;
    });
    this.subOpenCondiments = this.orderlistService.openCondimentsListener().subscribe((openCondiments: boolean) => {
      this.openCondiments = openCondiments;
    });
    this.subopenToppings = this.orderlistService.openToppingsListener().subscribe((openToppings: boolean) => {
      this.openToppings = openToppings;
    });
    this.orderlistService.getOpenCondiments();

  }
  scrollToTop(){
    this.myElement.nativeElement.ownerDocument.getElementById('scrollToTop').scrollIntoView({behavior: 'smooth'});
  }

  openShowOrderList() {
    this.showOrderList = true;
    console.log('openShowOrderList', this.showOrderList);
  }
  closeShowOrderList() {
    this.showOrderList = false;
    console.log('closeShowOrderList', this.showOrderList);

  }
  ngOnDestroy(): void {
      this.subOrderList.unsubscribe();
      this.subOpenCondiments.unsubscribe();
  }
}
