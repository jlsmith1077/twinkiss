import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';
import { Subscription } from 'rxjs';

import { Food } from './models/food.model';
import { Toppings } from './models/toppings.model';
import { OrderListService } from '../orderList.service';
import { Foods } from '../menu/models/foods.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  orderSelected: Food;
  comments: string;
  favoriteSeason: string;
  seasons: string[] = ['Normal', 'Lite','Xtra','On side'];
  orderlist: Food[] = [];
  order: boolean = false;
  add  = 'false';
  added  = 'false';
  foodselected: string;
  condiments: string;
  friedonions: string;
  condimentsqty: string;
  subOrderList: Subscription;
  subTotalPrice: Subscription;
  totalPrice: number = 0;
  price: number = 0;
  sizePrice: number = 0;
  sizeName: string = '';
  sodaChocolate: string = '';
  sodaVanilla: string = '';
  sodaCherry: string = '';
  sodaFlavor: string = this.sodaChocolate + this.sodaVanilla + this.sodaCherry;
  topping: boolean = false;
  sodaHtml = false;
  condimentDisplay = false;
  
  condimentChoice = '';
  total: number = 0;
  ketchup = '';
  mustard = '';
  mayonaise = '';
  relish = '';
  lettuce = '';
  tomato = '';
  onions = '';
  salt = '';
  pepper = '';
  cheese = '';
  pickles = '';
  bacon = '';
  friedOnions = '';
  sauce = '';
  oil = '';
  oregano = '';

  rainbowJimmies = '';
  chocolateJimmies = '';
  crunchCoat = '';
  wetWalnuts = '';
  mm = '';
  chocolateDipTop = '';
  peanutButterDipTop = '';
  peanutsCandy = '';
  rootBeerFloat = '';
  iceCreamSoda = '';
  Glacier = '';
  fudgeBoat = '';
  bananaBoat = '';
  funnelCakes = '';
  chocolateCoveredBananas = '';
  ice_creamSandwiches = '';
  sherbertSmoothie = '';
  additionalItems = '';

  condimentAmt: string[] = ['Lite','Xtra','On side'];
  checkKetchup = false;
  checkMustard = false;
  checkMayonaise = false;
  checkRelish = false;  
  checkLettuce = false;
  checkTomato = false;
  checkOnions = false;
  checkSalt = false;
  checkPepper = false;
  checkCheese = false;
  checkSauce = false;
  checkFriedOnions = false;
  checkBacon = false;
  checkPickles = false;
  checkOregano = false;
  checkOil = false;
  
  condimentOrder: string[];

  checkRainbowJimmies = false;
  checkchocolateJimmies = false;
  checkcrunchCoat = false;
  checkwetWalnuts = false;
  checkchocolateDipTop = false;
  checkmm = false;
  checkpeanutButterDipTop = false;
  checkpeanutsCandy = false;





  
  friedonions_qty = ['Normal', 'Lite', 'Xtra', 'Well Done'];
  comdiments_qty: string[] = ['Normal', 'Lite','Xtra','On side'];
  
  sizeIcecream: Foods[] =  [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5}];
  iceCreamSize = false;
  sizeShake = [{name: 'Reg Shake', price: 4.25}, {name: 'Malted Shake', price: 4.5}];
  shakeSize = false;
  sizeSundaes = [{name: 'Small', price: 4.75}, {name: 'Large', price: 5.75}];
  sundaeSize = false;
  sizeSlushies = [{name: 'Small', price: 1.9}, {name: 'Large', price: 2}, {name: 'Quart', price: 2.15}];
  slushieSize = false;
  sizeGelati = [{name: 'Small', price: 4.25}, {name: 'Large', price: 5.25}];
  gelatiSize = false;
  sizeWaterice = [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}];  
  waterIceSice = false;
  sizeSodas = [{name: 'Regular', price: 1.60}, {name: 'Large', price: 1.75}, {name: 'Quart', price: 1.95}, {name: 'Half Gallon', price: 2.25}, {name: 'Gallon', price: 3}];
  sodasSize = false;
  
  menu = [ 'Additional Items', 'Burgers & Dogs', 'Sandwiches', 'Steaks', 'Sides', 'Subs', 'Pretzels', 'Sodas', 'Ice Cream', 'Sundaes', 'Water Ice & Gelati', 'Shakes & Malts', 'Artic Swirls', 'Sherbert', 'Yogurt', 'Slushies' ];
  icecream = ['Vanilla icecream', 'Strawberry icecream', 'Butter Pecan icecream', 'Mint Chocolate Chip icecream', 'Cookies & Cream icecream', 'Chocolate Chip Cookie Dough icecream', 'Peanut Butter Cup icecream', 'Double Fudge Brownie icecream', 'Sweet and Salty Caramel Pretzel icecream', 'Birthday Cake icecream', 'Chocolate Penut Butter Cup icecream', 'Banana icecream', 'Black Cherry icecream', 'Pumpkin Pie icecream', 'Strawberry Shortcake icecream', 'Coffee icecream', 'Rocky Road icecream', 'Red Velvet Cake icecream', 'Bananna Split icecream', 'Strawberry Cheesecake icecream', 'Blueberry Cheesecake icecream' ];
  foodChosen = ['Hamburger', 'Cheeseburger', 'Twin Cheeseburger', 'Hollywood Burger', 'Twin Hollywood Burger', 'Hot Dog', 'Cheese Dog', 'Chili Dog', 'Chili Cheese Dog'];
  burgers = ['Hamburger', 'Cheeseburger', 'Twin Cheeseburger', 'Hollywood Burger', 'Twin Hollywood Burger', 'Hot Dog', 'Cheese Dog', 'Chili Dog', 'Chili Cheese Dog'];
  sandwiches = ['Rob Sandwich', 'Fish Sandwich', 'Chicken Sandwich', 'Grilled Cheese', 'BLT', 'Chicken Tenders & Fries', 'Shrimp & Fries', 'Chicken Dinner'];
  steaks = ['Cheesesteak', 'Cheesesteak w/ Fried Onions', 'Cheesesteak w/ Sauce', 'Pepper Steak', 'Pepper Cheese Steak', 'Philly Cheese Steak', 'Chicken Cheese Steak'];
  sides = ['Onion Rings', 'French Fries', 'Cheese Fries', 'Spicy Cross Track Fries', 'Cheese Spicy Cross Track Fries', 'Mozzarelli Sticks', 'Potato Puffs', 'Cheese Potato Puffs', 'Chicken Nuggets amt(6)', 'Chicken Nuggets amt(12)', 'Chicken Fingers'];
  subs = ['Regular Sub', 'Cheese Sub', 'Cheesesteak Sub', 'Italian Sub', 'Tuna Sub', 'Cheeseburger Sub', 'Ham & Cheese Sub'];
  pretzels = ['1 pretzel', '3 pretzels', '6 pretzels', '12 pretzels'];
  sodas = ['Coke soda', 'Sprite soda', 'Rootbeer soda', 'Diet Coke', 'Cherry Coke', 'Vanilla Coke', 'Cherry Vanilla Coke', 'Cherry Sprite', 'Rasberry Ice Tea'];
  sundaes = ['Brownie/Cookie Dough sundae', 'Cookie Dough sundae', 'Brownie sundae', 'Hot Fudge sundae', 'Strawberry sundae', 'Pineapple sundae', 'Chocolate sundae', 'Marshmallow sundae', 'Rasberry sundae', 'Cherry sundae', 'Blueberry sundae', 'Cream Dmenthe sundae', 'Dusty Road sundae', 'Caramel Walnut sundae', 'Peanut Butter sundae', 'Butter Scotch sundae', 'Funnel Cake sundae'];
  waterice_Gelati = ['Lemon waterice', 'Pineapple waterice', 'Orange Cream waterice', 'Banana waterice', 'Blue Rasberry waterice', 'Cherry waterice', 'Strawberry waterice', 'Watermelon waterice', 'Chocolate waterice', 'Swedish Fish waterice', 'Root Beer waterice', 'Cotton Candy waterice'];
  shakes_malts = ['Vanilla shake', 'Chocolate shake', 'Strawberry shake', 'Banana shake', 'Creamsickle shake', 'Blue Berry shake', 'Cherry Cream Dmenthe shake', 'Coffee shake', 'Root Beer shake', 'Black & White shake', 'Rasberry shake', 'Peanut Butter shake', 'Mocah shake', 'Pineapple shake'];
  arctic_swirls = ['Arctic Swirl Chocolate Chip Cookie Dough', 'Arctic Swirl  M&Ms', ' Arctic Swirl Snickers', 'Arctic Swirl Oreos', 'Arctic Swirl Heath Bar', 'Arctic Swirl Peanut Butter Cup'];
  sherbert = ['Banana Sherbert', 'Bubble Gum Sherbert', 'Pineapple Sherbert', 'Blue Berry Sherbert'];
  yogurt = ['Chocolate Yogurt', 'Toffee Crunch Yogurt', 'Peanut Butter Yogurt', 'Vanilla Bean Yogurt', 'Strawberry Yogurt'];
  // speacialty_Cones = ['Waffle Chocolate Jimmies', 'Waffle Rainbow Jimmies', 'Waffle Crunch Coat', ';']
  slushies = ['Lime Slushie', 'Pineapple Slushie', 'Rasberry Slushie', 'Orange Slushie', 'Grape Slushie', 'Cherry Slushie', 'Lemon Slushie'];
  root_beer_float = {name: 'Root Beer Float', price: 3.25};
  ice_cream_soda = {name: 'Ice Cream Soda', price: 3.25};
  glacier = {name: 'Glacier', price: 3.25 };
  fudge_boat = {name: 'Fudge Boat', price: 5.50};
  banana_boat = { name: 'Banana Boat', price: 5.70};
  funnel_cakes = 'Funnel Cake';
  chocolate_covered_bananas = 'Chocolate Covered Bananas';
  ice_cream_sandwiches = {name: 'Ice Cream Sandwich', price: 1.50};
  sherbert_smoothie = { name: 'Sherbert Smoothie', price: 3.75};
  additional_items = [this.sherbert_smoothie.name, this.ice_cream_sandwiches.name, this.chocolate_covered_bananas, this.funnel_cakes, this.banana_boat.name, this.fudge_boat.name, this.glacier.name, this.ice_cream_soda.name, this.root_beer_float.name];
 
  condiment = ['Ketchup', 'Mustard', 'Mayonaise',  'Relish', 'Lettuce', 'Tomato', 'Onions', 'Salt', 'Pepper', 'cheese', 'Pickles', 'Bacon', 'Oregano', 'Oil'];
  toppings: Toppings[] = [{name:'Rainbow Jimmies', price: .5}, {name:'Chocolate Jimmies', price: .5 }, {name: 'Crunch Coat', price: .75}, {name: 'M&Ms', price: .75}, {name: 'Wet Walnuts', price: .5}, {name: 'Chocolate Dip Top', price: .65}, {name: 'Peanut Butter Dip Top', price: .65}, {name: 'Peanuts Candy', price: .75}];
  condimentsFood = this.burgers.concat(this.sandwiches, this.steaks, this.sides, this.subs, this.pretzels);
  toppingsFood = this.sundaes.concat(this.waterice_Gelati, this.shakes_malts, this.icecream); 

  condimentsForm: FormGroup;
  toppingsForm: FormGroup;
  get c() {return this.condimentsForm.controls}
  get t() {return this.toppingsForm.controls}
 
  constructor(public formBuilder: FormBuilder, private orderlistService: OrderListService, private myElement: ElementRef) {
    this.condimentsForm = formBuilder.group({
      Ketchup: false,
      Mustard: false,
      Mayonaise: false,
      Relish: false,
      Lettuce: false,
      Tomato: false,
      Onions: false,
      Salt: false,
      Pepper: false,
      Cheese: false,
      Pickles: false,
      Bacon: false,
      Friedonions: false,
      Sauce: false,
      Oil: false,
      Oregano: false
    });
    this.toppingsForm = formBuilder.group({
      rainbowJimmies: false,
      chocolateJimmies: false,
      crunchCoat: false, 
      wetWalnuts: false,
      mm: false,
      chocolateDipTop: false,
      peanutButterDipTop: false,
      peanutsCandy: false,

    });
    this.condimentDisplay = false;
    this.topping = false;
    this.foodselected = '';
    this.total = 0;
   }

  ngOnInit(): void {
    this.topping = false;
    this.order = false;
    this.add = 'false';
    this.subOrderList = this.orderlistService.getorderlistListener().
    subscribe((orderList: Food[]) => {
      this.orderlist = orderList.reverse();
    });
    this.subTotalPrice = this.orderlistService.getTotalPriceListener().subscribe((totalPrice: number) => {
      this.totalPrice = totalPrice;
    });
    this.orderlistService.getOrder();
    this.orderlistService.getTotalPrice();
    this.sodaHtml = false;
  }

  toppingsChoice(topping: string) {
    this.toppingsForm.reset();
    switch(topping) {
      case 'Rainbow Jimmies':
        this.price = this.price + .50;
        break;
    }
    switch(topping) {
      case 'Chocolate Jimmies':
        this.price = this.price + .50;
        break;
    }
    switch(topping) {
      case 'Crunch Coat':
        this.price = this.price + .75;
        break;
    }
    switch(topping) {
      case 'M&Ms':
        this.price = this.price + .75;
        break;
    }
    switch(topping) {
      case 'Wet Walnuts':
        this.price = this.price + .50;
        break;
    }
    switch(topping) {
      case 'Chocolate Dip Top':
        this.price = this.price + .65;
        break;
    }
    switch(topping) {
      case 'Peanut Butter Dip Top':
        this.price = this.price + .65;
        break;
    }
    switch(topping) {
      case 'Peanuts Candy':
        this.price = this.price + .75;
        break;
    }
  }

  foodChoice(food: string) {
    this.condimentsForm.reset();
    switch(food) {
      case 'Additional Items':
        this.foodChosen = this.additional_items;
        this.topping = false;
        this.condimentDisplay = false;
        this.slushieSize = false;
        this.shakeSize = false;
        this.waterIceSice = false;
        this.sundaeSize = false;
        this.iceCreamSize = false;
        this.sodasSize = false;
        this.slushieSize = false;
        this.sodaHtml = false;
        break;
    }
    switch(food) {
      case 'Burgers & Dogs':
        this.foodChosen = this.burgers;
        this.topping = false;
        this.condimentDisplay = true;
        this.shakeSize = false;
        this.waterIceSice = false;
        this.sundaeSize = false;
        this.iceCreamSize = false;
        this.sodasSize = false;
        this.slushieSize = false;
        this.sodaHtml = false;
        break;
    }
    switch(food) {
      case 'Sandwiches':
        this.foodChosen = this.sandwiches;
        this.topping = false;
        this.condimentDisplay = true;
        this.shakeSize = false;
        this.waterIceSice = false;
        this.sundaeSize = false;
        this.iceCreamSize = false;
        this.sodasSize = false;
        this.slushieSize = false;
        this.sodaHtml = false;
        break;
    }
    switch(food) {
      case 'Steaks':
        this.foodChosen = this.steaks;
        this.topping = false;
        this.condimentDisplay = true;
        this.shakeSize = false;
        this.waterIceSice = false;
        this.sundaeSize = false;
        this.iceCreamSize = false;
        this.sodasSize = false;
        this.slushieSize = false;
        this.sodaHtml = false;
        break;
    }
    switch(food) {
      case 'Sides':
        this.foodChosen = this.sides;
        this.topping = false;
        this.condimentDisplay = true;
        this.shakeSize = false;
        this.waterIceSice = false;
        this.sundaeSize = false;
        this.iceCreamSize = false;
        this.sodasSize = false;
        this.slushieSize = false;
        this.sodaHtml = false;
        break;
    }
    switch(food) {
      case 'Subs':
        this.foodChosen = this.subs;
        this.topping = false;
        this.condimentDisplay = true;
        this.shakeSize = false;
        this.waterIceSice = false;
        this.sundaeSize = false;
        this.iceCreamSize = false;
        this.sodasSize = false;
        this.slushieSize = false;
        this.sodaHtml = false;
        break;
    }
    switch(food) {
      case 'Pretzels':
        this.foodChosen = this.pretzels;
        this.topping = false;
        this.condimentDisplay = true;
        this.shakeSize = false;
        this.waterIceSice = false;
        this.sundaeSize = false;
        this.iceCreamSize = false;
        this.sodasSize = false;
        this.slushieSize = false;
        this.sodaHtml = false;
        this.sodaHtml = false;
        break;
    }
    switch(food) {
      case 'Sodas':
        this.foodChosen = this.sodas;
        this.topping = false;
        this.condimentDisplay = false;
        this.shakeSize = false;
        this.waterIceSice = false;
        this.sundaeSize = false;
        this.iceCreamSize = false;
        this.slushieSize = false;
        this.sodasSize = true;
        this.sodaHtml = true;
        break;
    }
    switch(food) {
      case 'Ice Cream':
        this.foodChosen = this.icecream;
        this.topping = true;
        this.iceCreamSize = true;
        this.shakeSize = false;
        this.waterIceSice = false;
        this.sundaeSize = false;
        this.sodasSize = false;
        this.slushieSize = false;
        this.sodaHtml = false;
        break;
    }
    switch(food) {
      case 'Sundaes':
        this.foodChosen = this.sundaes;
        this.topping = true;
        this.sundaeSize = true; 
        this.shakeSize = false;
        this.waterIceSice = false;
        this.iceCreamSize = false; 
        this.sodasSize = false;
        this.slushieSize = false;    
        this.sodaHtml = false;
        break;
    }
    switch(food) {
      case 'Artic Swirls':
        this.foodChosen = this.arctic_swirls;
        this.topping = true;
        this.condimentDisplay = false;
        this.sundaeSize = true;
        this.shakeSize = false;
        this.waterIceSice = false;
        this.iceCreamSize = false;
        this.sodasSize = false;
        this.slushieSize = false;
        this.sodaHtml = false;
        break;
    }
    switch(food) {
      case 'Sherbert':
        this.foodChosen = this.sherbert;
        this.topping = true;
        this.condimentDisplay = false;
        this.iceCreamSize = true;
        this.shakeSize = false;
        this.waterIceSice = false;
        this.sundaeSize = false;
        this.sodasSize = false;
        this.slushieSize = false;
        this.sodaHtml = false;
        break;
    }
    switch(food) {
      case 'Yogurt':
        this.foodChosen = this.yogurt;
        this.topping = true;
        this.condimentDisplay = false;
        this.iceCreamSize = true;
        this.shakeSize = false;
        this.waterIceSice = false;
        this.sundaeSize = false;
        this.sodasSize = false;
        this.slushieSize = false;
        this.sodaHtml = false;
        break;
    }
    switch(food) {
      case 'Water Ice & Gelati':
        this.foodChosen = this.waterice_Gelati;
        this.topping = false;
        this.condimentDisplay = false;
        this.waterIceSice = true;
        this.shakeSize = false;
        this.waterIceSice = false;
        this.iceCreamSize = false;
        this.sundaeSize = false;
        this.sodasSize = false;
        this.slushieSize = false;
        this.sodaHtml = false;
        break;
    }
    switch(food) {
      case 'Shakes & Malts':
        this.foodChosen = this.shakes_malts;
        this.topping = true;
        this.shakeSize = true;
        this.waterIceSice = false;
        this.waterIceSice = false;
        this.iceCreamSize = false;
        this.sundaeSize = false;
        this.sodasSize = false;
        this.slushieSize = false;
        this.sodaHtml = false;
        break;
    }
    switch(food) {
      case 'Slushies':
        this.foodChosen = this.slushies;
        this.topping = true;
        this.slushieSize = true;
        this.shakeSize = false;
        this.sodasSize = false;
        this.waterIceSice = false;
        this.waterIceSice = false;
        this.iceCreamSize = false;
        this.sundaeSize = false;
        this.sodasSize = false;
        this.sodaHtml = false;
        break;
    }
  }

  menuClick() {
    this.mouseOut();
  }

  mouseOut() {
    this.shakeSize = false;
    this.waterIceSice = false;
    this.iceCreamSize = false;
    this.sundaeSize = false;
    this.sodaHtml = false;
    this.sodasSize = false;
    this.gelatiSize = false;
    this.slushieSize = false;
}

// Selected Food function-------------------------------------------------------------------

  selectedFood(food: string) {
    switch(food) {
      case 'Rob Sandwich': 
      this.condimentsForm.patchValue({
        Ketchup: true,
        Lettuce: true,
        Tomato: true,
        Mayonaise: true,
        Cheese: true
      });
        this.ketchup = 'Ketchup';
        this.lettuce = 'Lettuce';
        this.tomato = 'Tomato';
        this.mayonaise = 'Mayonaise';
        this.cheese = 'Cheese';

        this.checkKetchup = true;
        this.checkLettuce = true;
        this.checkTomato = true;
        this.checkCheese = true;
        this.checkMayonaise = true;
        this.price = 3.5;

      break;
      case 'Fish Sandwich':
        this.price = 3.25;
        break;
      case 'Chicken Sandwich':
        this.price = 3.75;
        break;
      case 'Grilled Cheese':
        this.cheese = 'Cheese';
        this.price = 2.75;
        break;
      case 'BLT': 
      this.condimentsForm.patchValue({
        Bacon: true,
        Lettuce: true,
        Tomato: true
      });
        this.lettuce = 'Lettuce';
        this.bacon = 'Bacon';
        this.tomato = 'Tomato';

        this.checkBacon = true;
        this.checkLettuce = true;
        this.checkTomato = true;

        this.price = 4.5;
      break;
      case 'Twin Hollywood Burger': 
      this.condimentsForm.patchValue({
        Lettuce: true,
        Tomato: true,
        Onions: true
      });
        this.tomato = 'Tomato';
        this.lettuce = 'Lettuce';
        this.onions = 'Onions';

        this.checkTomato = true;
        this.checkLettuce = true;
        this.checkOnions = true;

        this.price = 5.75;
      break;
      case 'Hollywood Burger': 
      this.condimentsForm.patchValue({
        Lettuce: true,
        Tomato: true,
        Onions: true
      });
        this.tomato = 'Tomato';
        this.lettuce = 'Lettuce';
        this.onions = 'Onions';

        this.checkTomato = true;
        this.checkLettuce = true;
        this.checkOnions = true;

        this.price = 4.75;
      break;
      case 'Twin Cheeseburger': 
      this.condimentsForm.patchValue({
        Cheese: true
      });
        this.cheese = 'Cheese';
        this.checkCheese = true;

        this.price = 4.95;
      break;
      case 'Cheeseburger': 
      this.condimentsForm.patchValue({
        Cheese: true
      });
      this.cheese = 'Cheese';
      this.checkCheese = true;

      this.price = 3.75;
      break;
      case 'Chili Cheese Dog': 
      this.condimentsForm.patchValue({
        Cheese: true
      });
      this.cheese = 'Cheese';
      this.checkCheese = true;

      this.price = 3.25;
      break;
      case 'Cheese Dog': 
      this.condimentsForm.patchValue({
        Cheese: true
      });
      this.cheese = 'Cheese';
      this.checkCheese = true;

      this.price = 2.65;
      break;
      case 'Regular Sub': 
      this.condimentsForm.patchValue({
        Lettuce: true,
        Tomato: true,
        Onions: true,
        Oregano: true,
        Oil: true
      });
        this.tomato = 'Tomato';
        this.lettuce = 'Lettuce';
        this.onions = 'Onions';
        this.oil = 'Oil';
        this.oregano = 'Oregano';

        this.checkTomato = true;
        this.checkLettuce = true;
        this.checkOnions = true;
        this.checkOil = true;
        this.checkOregano = true;

        this.price = 6.95;
      break;
      case 'Italian Sub': 
      this.condimentsForm.patchValue({
        Lettuce: true,
        Tomato: true,
        Onions: true,
        Oregano: true,
        Oil: true
      });
        this.tomato = 'Tomato';
        this.lettuce = 'Lettuce';
        this.onions = 'Onions';
        this.oil = 'Oil';
        this.oregano = 'Oregano';

        this.checkTomato = true;
        this.checkLettuce = true;
        this.checkOnions = true;
        this.checkOil = true;
        this.checkOregano = true;

        this.price = 6.95;
      break;
      case 'Tuna Sub': 
      this.condimentsForm.patchValue({
        Lettuce: true,
        Tomato: true,
        Onions: true,
        Oregano: true,
        Oil: true
      });
        this.tomato = 'Tomato';
        this.lettuce = 'Lettuce';
        this.onions = 'Onions';
        this.oil = 'Oil';
        this.oregano = 'Oregano';

        this.checkTomato = true;
        this.checkLettuce = true;
        this.checkOnions = true;
        this.checkOil = true;
        this.checkOregano = true;

        this.price = 7.75;
      break;
      case 'Cheesesteak Sub': 
      this.condimentsForm.patchValue({
        Lettuce: true,
        Tomato: true,
        Onions: true,
        Oregano: true,
        Oil: true
      });
        this.tomato = 'Tomato';
        this.lettuce = 'Lettuce';
        this.onions = 'Onions';
        this.oil = 'Oil';
        this.oregano = 'Oregano';

        this.checkTomato = true;
        this.checkLettuce = true;
        this.checkOnions = true;
        this.checkOil = true;
        this.checkOregano = true;

        this.price = 6.95;
      break;
      case 'Cheesesteak w/ Fried Onions': 
      this.condimentsForm.patchValue({
        Friedonions: true
      });
        this.friedOnions = 'Fried Onions';
        this.checkFriedOnions = true;

        this.price = 4.25;
      break;
      case 'Cheesesteak': 
      this.condimentsForm.patchValue({
        Cheese: true
      });
        this.cheese = 'Cheese';
        this.checkCheese = true;

        this.price = 3.75;
      break;
      case 'Philly Cheese Steak': 
      this.condimentsForm.patchValue({
        Cheese: true
      });
        this.cheese = 'Cheese';
        this.checkCheese = true;

        this.price = 5.25;
      break;
      case 'Chicken Cheese Steak': 
      this.condimentsForm.patchValue({
        Cheese: true
      });
        this.cheese = 'Cheese';
        this.checkCheese = true;

        this.price = 5.25;
      break;
      case 'Cheese Pepper Steak': 
      this.condimentsForm.patchValue({
        Pepper: true, 
        Cheese: true
      });
        this.pepper = 'Pepper';
        this.checkPepper = true;
        this.cheese = 'Cheese';
        this.checkCheese = true;

        this.price = 4.50;
      break;
      case 'Pepper Steak':
        this.price = 3.75;
      break;
      case 'Cheesesteak w/ Sauce': 
      this.condimentsForm.patchValue({
        Cheese: true
      });
        this.sauce = 'Sauce';
        this.checkSauce = true;
        this.cheese = 'Cheese';
        this.checkCheese = true;

        this.price = 4.25;
      break;
      case 'Cheeseburger Sub': 
      this.condimentsForm.patchValue({
        Lettuce: true,
        Tomato: true,
        Onions: true,
        Oregano: true,
        Oil: true
      });
        this.tomato = 'Tomato';
        this.lettuce = 'Lettuce';
        this.onions = 'Onions';
        this.oil = 'Oil';
        this.oregano = 'Oregano';

        this.checkTomato = true;
        this.checkLettuce = true;
        this.checkOnions = true;
        this.checkOil = true;
        this.checkOregano = true;

        this.price = 3.75;
      break;
      case 'Ham & Cheese Sub': 
      this.condimentsForm.patchValue({
        Lettuce: true,
        Tomato: true,
        Onions: true,
        Oregano: true,
        Oil: true
      });
        this.tomato = 'Tomato';
        this.lettuce = 'Lettuce';
        this.onions = 'Onions';
        this.oil = 'Oil';
        this.oregano = 'Oregano';

        this.checkTomato = true;
        this.checkLettuce = true;
        this.checkOnions = true;
        this.checkOil = true;
        this.checkOregano = true;

        this.price = 8;
      break;
      case 'Cheese Fries': 
      this.condimentsForm.patchValue({
        Cheese: true
      });
        this.cheese = 'Cheese';
        this.checkCheese = true;

        this.price = 4.5;
      break;
      case 'Cheese Spicy Cross Track Fries': 
      this.condimentsForm.patchValue({
        Cheese: true
      });
        this.cheese = 'Cheese';
        this.checkCheese = true;

        this.price = 4.75;
      break;
      case 'Spicy Cross Track Fries': 
      this.condimentsForm.patchValue({
      });
        this.price = 4.5;
      break;
      case 'Cheese Potato Puffs': 
      this.condimentsForm.patchValue({
        Cheese: true
      });
        this.cheese = 'Cheese';
        this.checkCheese = true;

        this.price = 4.5;
      break;
      case 'Sherbert Smoothie': 
        this.sherbertSmoothie = 'Sherbert Smoothie';
        this.price = 3.75;
      break;
      case 'Ice Cream Sandwich': 
        this.ice_creamSandwiches = 'Ice Cream Sandwich';
        this.price = 1.5;
      break;
      case 'Chocolate Covered Bananas':
        this.chocolateCoveredBananas = 'Chocolate Covered Bananas';
      break;
      case 'Funnel Cake': 
        this.funnelCakes = 'Funnel Cake';
      break;
      case 'Banana Boat':
        this.bananaBoat = 'Banana Boat';
        this.price = 5.7;
      break;
      case 'Fudge Boat':
        this.fudgeBoat = 'Fudge Boat';
        this.price = 5.5;
      break;
      case 'Glacier':
        this.Glacier = 'Glacier';
        this.price = 3.25;
      break;
      case 'Ice Cream Soda':
        this.iceCreamSoda = 'Ice Cream Soda';
        this.price = 3.25;
      break;
      case 'Root Beer Float':
        this.rootBeerFloat = 'Root Beer Float';
        this.price = 3.25;
      break;
      case '1 pretzel':
        this.price = .80;
      break;
      case '3 pretzels':
        this.price = 2.35;
      break;
      case '6 pretzels':
        this.price = 3.90;
      break;
      case '12 pretzels':
        this.price = 7.50;
      break;
    }
    this.foodselected = food;
    this.order = true;
  }
  
  checkCheckBoxvalue(event){
    console.log(event)
  }
  add_to_order() {
    this.mouseOut();
    this.add = 'true';
    this.order = false;
    this.topping = false;
    this.condimentDisplay = false;
    let price = this.price + this.sizePrice;
    const condimentArray: string[] = [this.ketchup, this.mustard, this.lettuce, this.mayonaise, this.relish, this.tomato, this.onions, this.salt, this.pepper, this.cheese,  this.rainbowJimmies, this.chocolateJimmies, this.crunchCoat, this.wetWalnuts, this.mm, this.chocolateDipTop, this.peanutButterDipTop, this.peanutsCandy, this.pickles, this.friedOnions, this.bacon, this.bacon, this.sauce];
    const filteredCondiments = condimentArray.filter(e => e !== '');
    const foodChosen = {name: this.foodselected + this.sizeName + this.sodaFlavor};
    this.sodaFlavor = this.sodaCherry + this.sodaChocolate + this.sodaVanilla;
    console.log('add to order food selected', this.foodselected);
    this.orderlistService.addToOrder(this.foodselected + this.sizeName + this.sodaFlavor, price, filteredCondiments, this.comments);
    this.orderlist.reverse();     
    this.total = this.total + price;
    this.total.toFixed(2);
    this.price = 0;
    this.sizePrice = 0;
    this.sodaCherry = '';
    this.sodaChocolate = '';
    this.sodaVanilla = '';
    this.sodaFlavor = '';
    this.sizeName = '';
    this.sizePrice = 0;
    this.ketchup = '';
    this.mustard = '';
    this.mayonaise = '';      
    this.relish = '';
    this.tomato = '';
    this.lettuce = '';
    this.onions = '';
    this.salt = '';
    this.pepper = '';
    this.cheese = '';
    this.pickles = '';
    this.bacon ='';
    this.friedOnions = '';
    this.sauce = '';
    this.oil = '';
    this.oregano = ''; 

    this.rainbowJimmies = '';
    this.chocolateJimmies = '';
    this.crunchCoat = '';
    this.wetWalnuts = '';
    this.mm = '';
    this.chocolateDipTop = '';
    this.peanutButterDipTop = '';
    this.peanutsCandy = '';

    this.rootBeerFloat ='';
    this.iceCreamSoda ='';
    this.Glacier ='';
    this.fudgeBoat ='';
    this.bananaBoat ='';
    this.funnelCakes ='';
    this.chocolateCoveredBananas ='';
    this.ice_creamSandwiches ='';
    this.sherbertSmoothie ='';
    this.additionalItems ='';

    this.checkKetchup = false;
    this.checkMustard = false;
    this.checkMayonaise = false;
    this.checkRelish = false;  
    this.checkLettuce = false;
    this.checkTomato = false;
    this.checkOnions = false;
    this.checkSalt = false;
    this.checkPepper = false;
    this.checkCheese = false;
    this.checkSauce = false;
    this.checkFriedOnions = false;
    this.checkBacon = false;
    this.checkPickles = false;
    this.price = 0;
    this.toppingsForm.reset();
    this.condimentsForm.reset();
  }
  scrollToTop(){
    this.myElement.nativeElement.ownerDocument.getElementById('scrollToTop').scrollIntoView({behavior: 'smooth'});
  }
  editSelectedFood(i, foodSelected: string, price: number) {
    this.scrollToTop();
    this.selectedFood(foodSelected);
    this.foodselected = foodSelected;
    const condimentFood = this.condimentsFood.filter(e => e === foodSelected);
    const toppingsFood = this.toppingsFood.filter(e => e === foodSelected);
    if(condimentFood.length > 0) {
      this.condimentDisplay = true;
    }
    if(toppingsFood.length > 0) {
      this.topping = true;
    }
    const cost = this.price - price;
    this.order = true;
    this.takeOffOrder(i, {name: foodSelected, price});
    
  }
  takeOffOrder(i, orderlistEl: {name: string, price: number}){
    this.orderlist.filter(item => item.name === orderlistEl.name);
    const removeSelection = this.orderlist.findIndex(item => item.name === orderlistEl.name);
    this.orderlist.splice(removeSelection, 1);
    this.total = this.total - orderlistEl.price;
    this.total.toFixed(2);
    this.orderlistService.removeItem(i, orderlistEl.price);
    
  }
  friedonionsChoice() {
    
  }
  condimentsChoice(selection: MatCheckboxChange, condimentEl: string, qtyEl: string ){
    const condiment_choice = selection.source.id.toString();
    this.condiments = condimentEl.concat(qtyEl + ', ');
    const selection_check = selection.checked.toString();
      switch(selection_check) {
        case 'true':
          break;
      }
      switch(selection_check) {
        case 'false':
          break;
      }

    }

    additionalComments(event) {
      this.comments = event.target.value;
      console.log('event', event.target.value, 'comments', this.comments);
    }

    unCheck(event: MatRadioChange, condimentEl) {
    }
    addCondiments(event: MatRadioChange, condimentEl) {
    }
    addToCondiment() {}
/////////////////////////////////////// Toppings Code /////////////////////////////////////////////////////////////////////////////////////////


rainbowJimmiesChecked(event: MatCheckboxChange) {
  if(event.checked) {
    this.checkRainbowJimmies = true;
    this.rainbowJimmies = 'Rainbow Jimmies';
    this.price = this.price + .50;
  } else {
    this.checkRainbowJimmies = false;
    this.rainbowJimmies = '';
    this.price = this.price - .50;
  }
}
chocolateJimmiesChecked(event: MatCheckboxChange) {
  if(event.checked) {
    this.checkchocolateJimmies = true;
    this.chocolateJimmies = 'Chocolate Jimmies';
    this.price = this.price + .50;
  } else {
    this.checkchocolateJimmies = false;
    this.chocolateJimmies = '';
    this.price = this.price - .50;
  }
}
crunchCoatChecked(event: MatCheckboxChange) {
  if(event.checked) {
    this.checkcrunchCoat = true;
    this.crunchCoat = 'Crunch Coat';
    this.price = this.price + .75;
  } else {
    this.checkcrunchCoat = false;
    this.crunchCoat = '';
    this.price = this.price - .75;
  }
}
wetWalnutsChecked(event: MatCheckboxChange) {
  if(event.checked) {
    this.checkwetWalnuts = true;
    this.wetWalnuts = 'Wet Walnuts';
    this.price = this.price + .50;
  } else {
    this.checkwetWalnuts = false;
    this.wetWalnuts = '';
    this.price = this.price - .50;
  }
}
mmChecked(event: MatCheckboxChange) {
  if(event.checked) {
    this.checkmm = true;
    this.mm = 'M&Ms';
    this.price = this.price + .75;
  } else {
    this.checkmm = false;
    this.mm = '';
    this.price = this.price - .75;
  }
}
chocolateDipTopChecked(event: MatCheckboxChange) {
  if(event.checked) {
    this.checkchocolateDipTop = true;
    this.chocolateDipTop = 'Chocolate Dip Top';
    this.price = this.price + .65;
  } else {
    this.checkchocolateDipTop = false;
    this.chocolateDipTop = '';
    this.price = this.price - .65;
  }
}
peanutButterDipTopChecked(event: MatCheckboxChange) {
  if(event.checked) {
    this.checkpeanutButterDipTop = true;
    this.peanutButterDipTop = 'Peanut Butter Dip Top';
    this.price = this.price + .65;
  } else {
    this.checkpeanutButterDipTop = false;
    this.peanutButterDipTop = '';
    this.price = this.price - .65;
  }
}
peanutsCandyChecked(event: MatCheckboxChange) {
  if(event.checked) {
    this.checkpeanutsCandy = true;
    this.peanutsCandy = 'Peanuts Candy';
    this.price = this.price + .75;
  } else {
    this.checkpeanutsCandy = false;
    this.peanutsCandy = '';
    this.price = this.price - .75;
  }
}
// //////////////////////////////////// CONDIMENTS CODE ///////////////////////////////////////////////////////////////////////////////////////

    sodaFlavorChocolate(event: MatCheckboxChange) {
      console.log('event in order', event.source.value);
      if(event.checked) {
        this.sodaChocolate = ' - ' + 'chocolate flavor';
        this.price = this.price + .10;
        console.log('price after addng flavors', this.price);
        } else {
          this.sodaChocolate = '';
          this.price = this.price - .10;
      }
    }
    sodaFlavorVanilla(event: MatCheckboxChange) {
      console.log('event in order', event.source.value);
      if(event.checked) {
        this.sodaVanilla = ' - ' + 'vanilla flavor';
        this.price = this.price + .10;
        console.log('price after addng flavors', this.price);
        } else {
          this.price = this.price - .10;
          this.sodaVanilla = '';
      }
    }
    sodaFlavorCherry(event: MatCheckboxChange) {
      console.log('event in order', event.source.value);
      if(event.checked) {
        this.sodaCherry = ' - ' + 'cherry flavor';
        this.price = this.price + .10;
        console.log('price after addng flavors', this.price);
        } else {
          this.sodaCherry = '';
          this.price = this.price - .10;
      }
    }

    sizeChecked(event: MatRadioChange) {
      if(event.value){
        this.sizePrice = event.value.price ;
        this.sizeName = ' (' + event.value.name + ')';
      } else {
        this.sizeName = '';
        this.sizePrice = this.sizePrice - event.value.price;
      }
    }

    ketchupChecked(event: MatCheckboxChange) {
      if(event.checked) {
        this.checkKetchup = true;
        this.ketchup = 'ketchup';
      } else {
        this.checkKetchup = false;
        this.ketchup = '';
      }
    }
  
    updateKetchup(event: MatRadioChange) {
      console.log('ketchup event', event);
      this.ketchup = event.value + '- ketchup';
    }
  
    mustardChecked(event: MatCheckboxChange) {
      if(event.checked) {
        this.checkMustard = true;
        this.mustard = 'mustard'
      } else {
        this.checkMustard = false;
        this.mustard = '';
      }
    }
    updateMustard(event: MatRadioChange) {
      console.log('mustard event', event);
      this.mustard = event.value + '- mustard';
    }
    mayonaiseChecked(event: MatCheckboxChange) {
      if(event.checked) {
        this.checkMayonaise = true;
        this.mayonaise = 'mayonaise';
      } else {
        this.checkMayonaise = false;
        this.mayonaise = '';
      }
    }
    updateMayonaise(event: MatRadioChange) {
      console.log('mayonaise event', event);
      this.mayonaise = event.value + '- mayonaise';
    }
    relishChecked(event: MatCheckboxChange) {
      if(event.checked) {
        this.checkRelish = true;
        this.relish = 'relish';
      } else {
        this.checkRelish = false;
        this.relish = '';
      }
    }
    updateRelish(event: MatRadioChange) {
      console.log('relish event', event);
      this.relish = event.value + '- relish';
    }
    lettuceChecked(event: MatCheckboxChange) {
      if(event.checked) {
        this.checkLettuce = true;
        this.lettuce = 'lettuce';
      } else {
        this.checkLettuce = false;
        this.lettuce = '';
      }
    }
    updateLettuce(event: MatRadioChange) {
      this.lettuce = event.value + '- lettuce';
    }
    tomatoChecked(event: MatCheckboxChange) {
      if(event.checked) {
        this.checkTomato = true;
        this.tomato = 'tomato';
      } else {
        this.checkTomato = false;
        this.tomato = '';
      }
    }
    updateTomato(event: MatRadioChange) {
      this.tomato = event.value + '- tomato';
    }
    onionsChecked(event: MatCheckboxChange) {
      if(event.checked) {
        this.checkOnions = true;
        this.onions = 'onions';
      } else {
        this.checkOnions = false;
        this.onions = '';
      }
    }
    updateOnions(event: MatRadioChange) {
      console.log('onion event', event);
      this.onions = event.value + '- onion';
      console.log('onion', this.onions);
    }
    saltChecked(event: MatCheckboxChange) {
      if(event.checked) {
        this.checkSalt = true;
        this.salt = 'salt';
      } else {
        this.checkSalt = false;
        this.salt = '';
      }
    }
    updateSalt(event: MatRadioChange) {
      console.log('salt event', event);
      this.salt = event.value + '- salt';
      console.log('salt', this.salt);
    }
    pepperChecked(event: MatCheckboxChange) {
      if(event.checked) {
        this.checkPepper = true;
        this.pepper = 'pepper';
      } else {
        this.checkPepper = false;
        this.pepper = '';
      }
    }
    updatePepper(event: MatRadioChange) {
      console.log('pepper event', event);
      this.pepper = event.value + '- pepper';
      console.log('pepper', this.pepper);
    }
    cheeseChecked(event: MatCheckboxChange) {
      if(event.checked) {
        this.checkCheese = true;
        this.cheese = 'cheese';
      } else {
        this.checkCheese = false;
        this.cheese = '';
      }
    }
    updateCheese(event: MatRadioChange) {
      console.log('cheese event', event);
      this.cheese = event.value + '- cheese';
      console.log('cheese', this.cheese);
    }
    picklesChecked(event: MatCheckboxChange) {
      if(event.checked) {
        this.checkPickles = true;
        this.pickles = 'pickles';
      } else {
        this.checkPickles = false;
        this.pickles = '';
      }
    }
    updatePickles(event: MatRadioChange) {
      console.log('Pickles event', event);
      this.pickles = event.value + '- pickles';
      console.log('Pickles', this.pickles);
    }
    baconChecked(event: MatCheckboxChange) {
      if(event.checked) {
        this.checkBacon = true;
        this.bacon = 'bacon';
      } else {
        this.checkBacon = false;
        this.bacon = '';
      }
    }
    
    updateBacon(event: MatRadioChange) {
      console.log('bacon event', event);
      this.bacon = event.value + '- bacon';
      console.log('bacon', this.bacon);
    }
    friedOnionsChecked(event: MatCheckboxChange) {
      if(event.checked) {
        this.checkFriedOnions = true;
        this.friedOnions = 'fried onions';
      } else {
        this.checkFriedOnions = false;
        this.friedOnions = '';
      }
    }
    updateFriedOnions(event: MatRadioChange) {
      console.log('fried Onions event', event);
      this.friedonions = event.value + '- fried onions';
      console.log('friedonions', this.friedonions);
    }
    sauceChecked(event: MatCheckboxChange) {
      if(event.checked) {
        this.checkSauce = true;
        this.sauce = 'sauce';
      } else {
        this.checkSauce = false;
        this.sauce = '';
      }
    }
    updateSauce(event: MatRadioChange) {
      console.log('Sauce event', event);
      this.sauce = event.value + '- sauce';
      console.log('sauce', this.sauce);
    }
  
    addToOrder() {
      const condimentArray: string[] = [this.ketchup, this.mustard, this.lettuce, this.mayonaise, this.relish, this.tomato, this.onions, this.salt, this.pepper, this.cheese, this.rainbowJimmies, this.chocolateJimmies, this.crunchCoat, this.wetWalnuts, this.mm, this.chocolateDipTop, this.peanutButterDipTop, this.peanutsCandy];
      const filteredCondiments = condimentArray.filter(e => e !== '');
  
    }

    handdippedShake(e: MatCheckboxChange) {
      if(e.checked) {
        this.price = this.price + .5;
      } else {
        this.price = this.price - .5;
      }    
    }
  ngOnDestroy(): void {
      this.subOrderList.unsubscribe();
      this.subTotalPrice.unsubscribe();
  }
}
