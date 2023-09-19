import { Component, Input, OnInit, Output, OnDestroy, EventEmitter } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {FormControl, FormGroup, FormBuilder, FormArray, NgForm} from '@angular/forms';
import { Food } from 'src/app/order/models/food.model';
import { Toppings } from 'src/app/order/models/toppings.model';
import { OrderListService } from 'src/app/orderList.service';
import { Foods } from '../../models/foods.model';
import { Subscription } from 'rxjs';
 

@Component({
  selector: 'app-food-toppings',
  templateUrl: './food-toppings.component.html',
  styleUrls: ['./food-toppings.component.css']
})
export class FoodToppingsComponent implements OnInit, OnDestroy {
  showCondimentsSubscription: Subscription;
  foodSelectedSubscription: Subscription;
  subNoToppings: Subscription;
  subTemporaryFood: Subscription;
  subHandDipped: Subscription;
  @Output() openCondiments = new EventEmitter<boolean>();
  foodSelected: string;
  food: string;
  temporaryFood: string;
  handippedText: string;
  condimentsForm: FormGroup;
  toppingsForm: FormGroup;
  @Input() price: number = 0;
  topping = false;
  showCondiments: boolean = false;
  condimentDisplay = false;
  noToppings: boolean = false;
  handDipped: boolean = false;
    
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

  condimentOrder: string[];

  checkRainbowJimmies = false;
  checkchocolateJimmies = false;
  checkcrunchCoat = false;
  checkwetWalnuts = false;
  checkchocolateDipTop = false;
  checkmm = false;
  checkpeanutButterDipTop = false;
  checkpeanutsCandy = false;





  orderSelected: Food;
  comments: string;
  favoriteSeason: string;
  seasons: string[] = ['Normal', 'Lite','Xtra','On side'];
  orderlist: Food[] = [];
  @Output() orderList = new EventEmitter<Food[]>();
  order: boolean = false;
  add  = 'false';
  added  = 'false';
  condiments: string;
  friedonions: string;
  condimentsqty: string
  friedonions_qty = ['Normal', 'Lite', 'Xtra', 'Well Done'];
  comdiments_qty: string[] = ['Normal', 'Lite','Xtra','On side'];

  sizeIcecream: Foods[] =  [{name: 'Kiddie', price: 2.25}, {name: 'Small', price: 3.25}, {name: 'Medium', price: 3.75}, {name: 'Large', price: 4.25}, {name: 'Pint', price: 4}, {name: 'Quart', price: 5.5}];
  iceCreamSize = false;
  sizeShake = [{name: 'Reg Shake', price: 4.25}, {name: 'Malt', price: 4.5}];
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

menu = [ 'Additional Items', 'Burgers & Hot Dogs', 'Sandwiches', 'Steaks', 'Sides', 'Subs', 'Pretzels', 'Sodas', 'Ice Cream', 'Sundaes', 'Water Ice & Gelati', 'Shakes & Malts', 'Artic Swirls', 'Sherbert', 'Yogurt', 'Slushies' ];
icecream = ['Vanilla icecream', 'Strawberry icecream', 'Butter Pecan icecream', 'Mint Chocolate Chip icecream', 'Cookies & Cream icecream', 'Chocolate Chip Cookie Dough icecream', 'Penut Butter Cup icecream', 'Double Fudge Brownie icecream', 'Sweet and Salty Caramel Pretzel icecream', 'Birthday Cake icecream', 'Chocolate Penut Butter Cup icecream', 'Banana icecream', 'Black Cherry icecream', 'Pumpkin Pie icecream', 'Strawberry Shortcake icecream', 'Coffee icecream', 'Rocky Road icecream', 'Red Velvet Cake icecream', 'Bananna Split icecream', 'Strawberry Cheesecake icecream', 'Blueberry Cheesecake icecream' ];
foodChosen = ['Hamburger', 'Cheeseburger', 'Twin Cheeseburger', 'Hollywood Burger', 'Twin Hollywood Burger', 'Hot Dog', 'Cheese Dog', 'Chili Dog', 'Chili Cheese Dog'];
burgers = ['Hamburger', 'Cheeseburger', 'Twin Cheeseburger', 'Hollywood Burger', 'Twin Hollywood Burger', 'Hot Dog', 'Cheese Dog', 'Chili Dog', 'Chili Cheese Dog'];
sandwiches = ['Rob Sandwich', 'Fish Sandwich', 'Chicken Sandwich', 'Grilled Cheese', 'BLT', 'Chicken Tenders & Fries', 'Shrimp & Fries', 'Chicken Dinner'];
steaks = ['Cheesesteak', 'Cheesesteak w/ Fried Onions', 'Cheesesteak w/ Sauce', 'Pepper Steak', 'Cheese Pepper Steak'];
sides = ['Onion Rings', 'French Fries', 'Cheese Fries', 'Spicy Cross Track Fries', 'Cheese Spicy Cross Track Fries', 'Mozzarelli Sticks', 'Potato Puffs', 'Cheese Potato Puffs', 'Chicken Nuggets amt(6)', 'Chicken Nuggets amt(12)', 'Chicken Fingers'];
subs = ['Regular Sub', 'Cheese Sub', 'Cheesesteak Sub', 'Italian Sub', 'Tuna Sub', 'Cheeseburger Sub', 'Ham & Cheese Sub'];
pretzels = ['1 pretzel', '2 pretzels', '3 pretzels', '4 pretzels', '5 pretzels', '6 pretzels', '12 pretzels'];
sodas = ['Coke soda', 'Sprite soda', 'Rootbeer soda', 'Diet Coke', 'Cherry Coke', 'Vanilla Coke', 'Cherry Vanilla Coke', 'Cherry Sprite', 'Rasberry Ice Tea', 'Additional Flavors'];
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

condiment = ['Ketchup', 'Mustard', 'Mayonaise',  'Relish', 'Lettuce', 'Tomato', 'Onions', 'Salt', 'Pepper', 'cheese', 'Pickles', 'Bacon'];
toppings: Toppings[] = [{name:'Rainbow Jimmies', price: .5}, {name:'Chocolate Jimmies', price: .5 }, {name: 'Crunch Coat', price: .75}, {name: 'M&Ms', price: .75}, {name: 'Wet Walnuts', price: .5}, {name: 'Chocolate Dip Top', price: .65}, {name: 'Peanut Butter Dip Top', price: .65}, {name: 'Peanuts Candy', price: .75}];
condimentsFood = this.burgers.concat(this.sandwiches, this.steaks, this.sides, this.subs, this.pretzels);
toppingsFood = this.sundaes.concat(this.waterice_Gelati, this.shakes_malts, this.icecream); 


constructor(formBuilder: FormBuilder, private orderListService: OrderListService) {
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

  })
  this.condimentDisplay = false;
  this.topping = false;
  this.foodSelected = '';
  this.total = 0;
 }

ngOnInit(): void {
  this.foodSelectedSubscription = this.orderListService.getFoodSelectedListener().subscribe((foodSelected: string) => {    
    this.foodSelected = foodSelected;
    this.selectedFood(this.foodSelected);
    console.log('food selected in food toppings', this.foodSelected);
  })
  this.showCondimentsSubscription = this.orderListService.openshowCondimentsListener().subscribe((showCondiments: boolean)=> {
    this.showCondiments = showCondiments;
  });
  this.subNoToppings = this.orderListService.noToppingsListener().subscribe((noToppings: boolean)=> {
    this.noToppings = noToppings;
  });
  this.subTemporaryFood = this.orderListService.temporaryFoodListener().subscribe((temporaryFood: string)=> {
    this.temporaryFood = temporaryFood;
    console.log('temporary food', this.temporaryFood);
  });
  this.subHandDipped = this.orderListService.handDippedListener().subscribe((handDipped: boolean)=> {
    this.handDipped = handDipped;
    console.log('hand Dipped', this.handDipped);
  });
  this.topping = false;
  this.order = false;
  this.add = 'false';
  this.orderListService.getTemporaryFood();
  this.orderListService.openshowCondiments();
  this.orderListService.getFoodSelected();
  this.orderListService.getNoToppings();
  this.orderListService.getHandDipped();
}

closeFoodToppings() {
  const openCondiments = true;
  this.orderListService.updateOpenCondiments(openCondiments);
  const openToppings = true;
  this.orderListService.updateOpenToppings(openToppings);
}
handdippedShake(e: MatCheckboxChange) {
  this.handippedText = ' Hand Dipped';  
  console.log('e value', this.handippedText, e.checked );
  if(e.checked) {
    this.price = this.price + .5;
  } else {
    this.price = this.price - .5;
  }
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
      break;
  }
  switch(food) {
    case 'Artic Swirls':
      this.foodChosen = this.arctic_swirls;
      this.topping = true;
      this.condimentDisplay = false;
      break;
  }
  switch(food) {
    case 'Sherbert':
      this.foodChosen = this.sherbert;
      this.topping = true;
      this.condimentDisplay = false;
      break;
  }
  switch(food) {
    case 'Yogurt':
      this.foodChosen = this.yogurt;
      this.topping = true;
      this.condimentDisplay = false;
      break;
  }

  switch(food) {
    case 'Burgers & Hot Dogs':
      this.foodChosen = this.burgers;
      this.topping = false;
      this.condimentDisplay = true;
      break;
  }
  switch(food) {
    case 'Sandwiches':
      this.foodChosen = this.sandwiches;
      this.topping = false;
      this.condimentDisplay = true;
      break;
  }
  switch(food) {
    case 'Steaks':
      this.foodChosen = this.steaks;
      this.topping = false;
      this.condimentDisplay = true;
      break;
  }
  switch(food) {
    case 'Sides':
      this.foodChosen = this.sides;
      this.topping = false;
      this.condimentDisplay = true;
      break;
  }
  switch(food) {
    case 'Subs':
      this.foodChosen = this.subs;
      this.topping = false;
      this.condimentDisplay = true;
      break;
  }
  switch(food) {
    case 'Pretzels':
      this.foodChosen = this.pretzels;
      this.topping = false;
      this.condimentDisplay = true;
      break;
  }
  switch(food) {
    case 'Sodas':
      this.foodChosen = this.sodas;
      this.topping = false;
      this.condimentDisplay = false;
      break;
  }
  switch(food) {
    case 'Ice Cream':
      this.foodChosen = this.icecream;
      this.topping = true;
      this.handDipped = true;
      console.log('shake size', this.handDipped);
      break;
  }
  switch(food) {
    case 'Sundaes':
      this.foodChosen = this.sundaes;
      this.topping = true;
      this.handDipped = true;
      break;
  }
  switch(food) {
    case 'Water Ice & Gelati':
      this.foodChosen = this.waterice_Gelati;
      this.topping = false;
      this.condimentDisplay = false;
      break;
  }
  switch(food) {
    case 'Shakes & Malts':
      this.foodChosen = this.shakes_malts;
      this.topping = true;
      this.handDipped = true;
      break;
  }
}

// -------------------------------------------------------------------

selectedFood(foodSelected: string) {
  const food = this.temporaryFood;
  switch(food) {
    case 'Rob Sandwich': 
    this.condimentsForm.patchValue({
      Ketchup: true,
      Lettuce: true,
      Tomato: true,
      Mayonaise: true,
      Cheese: true
    });
      this.ketchup = ' ketchup';
      this.lettuce = ' lettuce';
      this.tomato = ' tomato';
      this.mayonaise = ' mayonaise';
      this.cheese = ' cheese';

      this.checkKetchup = true;
      this.checkLettuce = true;
      this.checkTomato = true;
      this.checkCheese = true;
      this.checkMayonaise = true;

    break;
    case 'BLT': 
    this.condimentsForm.patchValue({
      Bacon: true,
      Lettuce: true,
      Tomato: true
    });
      this.lettuce = ' lettuce';
      this.bacon = ' bacon';
      this.tomato = ' tomato';

      this.checkBacon = true;
      this.checkLettuce = true;
      this.checkTomato = true;
    break;
    case 'Cheese Sub': 
    this.condimentsForm.patchValue({
      Cheese: true,
      Lettuce: true,
      Tomato: true,
      Onions: true
    });      
      this.tomato = ' tomato';
      this.lettuce = ' lettuce';
      this.onions = ' onions';
      this.cheese = ' cheese';

      this.checkTomato = true;
      this.checkKetchup = true;
      this.checkOnions = true;
      this.checkCheese = true;
    break;
    case '1/2 Cheese Sub': 
    this.condimentsForm.patchValue({
      Cheese: true,
      Lettuce: true,
      Tomato: true,
      Onions: true
    });      
      this.tomato = ' tomato';
      this.lettuce = ' lettuce';
      this.onions = ' onions';
      this.cheese = ' cheese';

      this.checkTomato = true;
      this.checkKetchup = true;
      this.checkOnions = true;
      this.checkCheese = true;
    break;
    case 'Twin Hollywood Burger': 
    this.condimentsForm.patchValue({
      Lettuce: true,
      Tomato: true,
      Onions: true
    });
      this.tomato = ' tomato';
      this.lettuce = ' lettuce';
      this.onions = ' onions';

      this.checkTomato = true;
      this.checkLettuce = true;
      this.checkOnions = true;
    break;
    case 'Hollywood Burger': 
    this.condimentsForm.patchValue({
      Lettuce: true,
      Tomato: true,
      Onions: true
    });
    this.tomato = ' tomato';
    this.lettuce = ' lettuce';
    this.onions = ' onions';

      this.checkTomato = true;
      this.checkLettuce = true;
      this.checkOnions = true;
    break;
    case 'Twin Cheeseburger': 
    this.condimentsForm.patchValue({
      Cheese: true
    });
      this.cheese = ' Cheese';
      this.checkCheese = true;
    break;
    case 'Cheeseburger': 
    this.condimentsForm.patchValue({
      Cheese: true
    });
    this.cheese = ' Cheese';
    this.checkCheese = true;
    break;
    case 'Chili Cheese Dog': 
    this.condimentsForm.patchValue({
      Cheese: true
    });
    this.cheese = ' Cheese';
    this.checkCheese = true;
    break;
    case 'Cheese Dog': 
    this.condimentsForm.patchValue({
      Cheese: true
    });
    this.cheese = 'Cheese';
    this.checkCheese = true;
    break;
    case 'Regular Sub': 
    this.condimentsForm.patchValue({
      Lettuce: true,
      Tomato: true,
      Onions: true
    });
      this.tomato = ' tomato';
      this.lettuce = ' lettuce';
      this.onions = ' onions';

      this.checkTomato = true;
      this.checkLettuce = true;
      this.checkOnions = true;
    break;
    case '1/2 Regular Sub': 
    this.condimentsForm.patchValue({
      Lettuce: true,
      Tomato: true,
      Onions: true
    });
      this.tomato = ' tomato';
      this.lettuce = ' lettuce';
      this.onions = ' onions';

      this.checkTomato = true;
      this.checkLettuce = true;
      this.checkOnions = true;
    break;
    case 'Italian Sub': 
    this.condimentsForm.patchValue({
      Lettuce: true,
      Tomato: true,
      Onions: true
    });
      this.tomato = ' tomato';
      this.lettuce = ' lettuce';
      this.onions = ' onions';

      this.checkTomato = true;
      this.checkLettuce = true;
      this.checkOnions = true;
    break;
    case '1/2 Italian Sub': 
    this.condimentsForm.patchValue({
      Lettuce: true,
      Tomato: true,
      Onions: true
    });
      this.tomato = ' tomato';
      this.lettuce = ' lettuce';
      this.onions = ' onions';

      this.checkTomato = true;
      this.checkLettuce = true;
      this.checkOnions = true;
    break;
    case 'Tuna Sub': 
    this.condimentsForm.patchValue({
      Lettuce: true,
      Tomato: true,
      Onions: true
    });
      this.tomato = ' tomato';
      this.lettuce = ' lettuce';
      this.onions = ' onions';

      this.checkTomato = true;
      this.checkLettuce = true;
      this.checkOnions = true;
    break;
    case '1/2 Tuna Sub': 
    this.condimentsForm.patchValue({
      Lettuce: true,
      Tomato: true,
      Onions: true
    });
      this.tomato = ' tomato';
      this.lettuce = ' lettuce';
      this.onions = ' onions';

      this.checkTomato = true;
      this.checkLettuce = true;
      this.checkOnions = true;
    break;
    case 'Cheesesteak Sub': 
    this.condimentsForm.patchValue({
      Lettuce: true,
      Tomato: true,
      Onions: true
    });
      this.tomato = ' tomato';
      this.lettuce = ' lettuce';
      this.onions = ' onions';
      
      this.checkTomato = true;
      this.checkLettuce = true;
      this.checkOnions = true;
    break;
    case '1/2 Cheeseburger Sub': 
    this.condimentsForm.patchValue({
      Lettuce: true,
      Tomato: true,
      Onions: true,
      Cheese: true
    });
      this.tomato = ' tomato';
      this.lettuce = ' lettuce';
      this.onions = ' onions';
      this.cheese = ' cheese'
      
      this.checkTomato = true;
      this.checkLettuce = true;
      this.checkOnions = true;
    break;
    case 'Cheeseburger Sub': 
    this.condimentsForm.patchValue({
      Lettuce: true,
      Tomato: true,
      Onions: true,
      Cheese: true
    });
      this.tomato = ' tomato';
      this.lettuce = ' lettuce';
      this.onions = ' onions';
      this.cheese = ' cheese'
      
      this.checkTomato = true;
      this.checkLettuce = true;
      this.checkOnions = true;
    break;
    case 'Ham & Cheese Sub': 
    this.condimentsForm.patchValue({
      Lettuce: true,
      Tomato: true,
      Onions: true,
      Cheese: true
    });
      this.tomato = ' tomato';
      this.lettuce = ' lettuce';
      this.onions = ' onions';
      this.cheese = ' cheese'
      
      this.checkTomato = true;
      this.checkLettuce = true;
      this.checkOnions = true;
    break;
    case '1/2 Ham & Cheese Sub': 
    this.condimentsForm.patchValue({
      Lettuce: true,
      Tomato: true,
      Onions: true,
      Cheese: true
    });
      this.tomato = ' tomato';
      this.lettuce = ' lettuce';
      this.onions = ' onions';
      this.cheese = ' cheese'
      
      this.checkTomato = true;
      this.checkLettuce = true;
      this.checkOnions = true;
    break;
    case '1/2 Cheesesteak Sub': 
    this.condimentsForm.patchValue({
      Lettuce: true,
      Tomato: true,
      Onions: true
    });
      this.tomato = ' tomato';
      this.lettuce = ' lettuce';
      this.onions = ' onions';
      
      this.checkTomato = true;
      this.checkLettuce = true;
      this.checkOnions = true;
    break;
    case 'Cheesesteak w/ Fried Onions': 
    this.condimentsForm.patchValue({
      Friedonions: true
    });
      this.friedOnions = 'Fried Onions';
      this.checkFriedOnions = true;
    break;
    case 'Cheeseburger': 
    this.condimentsForm.patchValue({
      Lettuce: true,
      Tomato: true,
      Onions: true
    });
      this.tomato = ' tomato';
      this.lettuce = ' lettuce';
      this.onions = ' onions';

      this.checkTomato = true;
      this.checkLettuce = true;
      this.checkOnions = true;
    break;
    case 'Cheese Fries': 
    this.condimentsForm.patchValue({
      Cheese: true
    });
      this.cheese = ' cheese';
      this.checkCheese = true;
    break;
    case 'Cheese Spicy Cross Track Fries': 
    this.condimentsForm.patchValue({
      Cheese: true
    });
      this.cheese = ' cheese';
      this.checkCheese = true;
    break;
    case 'Cheese Potato Puffs': 
    this.condimentsForm.patchValue({
      Cheese: true
    });
      this.cheese = ' cheese';
      this.checkCheese = true;
    break;
    case 'Sherbert Smoothie': 
      this.sherbertSmoothie = 'Sherbert Smoothie';
    break;
    case 'Ice Cream Sandwich': 
      this.ice_creamSandwiches = 'Ice Cream Sandwich';
    break;
    case 'Chocolate Covered Bananas':
      this.chocolateCoveredBananas = 'Chocolate Covered Bananas';
    break;
    case 'Funnel Cake': 
      this.funnelCakes = 'Funnel Cake';
    break;
    case 'Banana Boat':
      this.bananaBoat = 'Banana Boat';
    break;
    case 'Fudge Boat':
      this.fudgeBoat = 'Fudge Boat';
    break;
    case 'Glacier':
      this.Glacier = 'Glacier';
    break;
    case 'Ice Cream Soda':
      this.iceCreamSoda = 'Ice Cream Soda';
    break;
    case 'Root Beer Float':
      this.rootBeerFloat = 'Root Beer Float';
    break;
  }
  this.foodSelected = food;
  
  this.order = true;   
}

editSelectedFood(foodSelected: string, price: number) {
  this.selectedFood(foodSelected);
  this.foodSelected = foodSelected;
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
  this.takeOffOrder({name: foodSelected, price});
  
}
checkCheckBoxvalue(event){
  console.log(event)
}
add_to_order() {
  this.add = 'true';
  this.order = false;
  this.topping = false;
  this.condimentDisplay = false;
  this.openCondiments.emit(false);
  let price = this.price;
  console.log('food selected + handippedText', this.foodSelected);
  const condimentArray: string[] = [this.ketchup, this.mustard, this.lettuce, this.mayonaise, this.relish, this.tomato, this.onions, this.salt, this.pepper, this.cheese,  this.rainbowJimmies, this.chocolateJimmies, this.crunchCoat, this.wetWalnuts, this.mm, this.chocolateDipTop, this.peanutButterDipTop, this.peanutsCandy, this.pickles, this.friedOnions, this.bacon, this.sauce];
  const filteredCondiments = condimentArray.filter(e => e !== '');
  const foodChosen = {name: this.foodSelected, price: price, condiments: filteredCondiments, comments: this.comments};
  this.orderListService.addToOrder(this.handippedText, price, filteredCondiments, this.comments)
  // this.orderlist.push({name: this.foodSelected, price, condiments: filteredCondiments, comments: this.comments} ); 
  this.orderlist.reverse();     
  this.total = this.total + price;
  this.total.toFixed(2);
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

  this.handDipped = false;
  this.price = 0;
  this.toppingsForm.reset();
  this.condimentsForm.reset();
}
takeOffOrder(orderlistEl: {name: string, price: number}){
  this.orderlist.filter(item => item.name === orderlistEl.name);
  const removeSelection = this.orderlist.findIndex(item => item.name === orderlistEl.name);
  this.orderlist.splice(removeSelection, 1);
  this.total = this.total - orderlistEl.price;
  this.total.toFixed(2);
  
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



  ketchupChecked(event: MatCheckboxChange) {
    if(event.checked) {
      this.checkKetchup = true;
      this.ketchup = ' ketchup';
    } else {
      this.checkKetchup = false;
      this.ketchup = '';
    }
  }

  updateKetchup(event: MatRadioChange) {
    this.ketchup = event.value + '- ketchup';
  }

  mustardChecked(event: MatCheckboxChange) {
    if(event.checked) {
      this.checkMustard = true;
      this.mustard = ' mustard'
    } else {
      this.checkMustard = false;
      this.mustard = '';
    }
  }
  updateMustard(event: MatRadioChange) {
    this.mustard = event.value + '- mustard';
  }
  mayonaiseChecked(event: MatCheckboxChange) {
    if(event.checked) {
      this.checkMayonaise = true;
      this.mayonaise = ' mayonaise';
    } else {
      this.checkMayonaise = false;
      this.mayonaise = '';
    }
  }
  updateMayonaise(event: MatRadioChange) {
    this.mayonaise = event.value + '- mayonaise';
  }
  relishChecked(event: MatCheckboxChange) {
    if(event.checked) {
      this.checkRelish = true;
      this.relish = ' relish';
    } else {
      this.checkRelish = false;
      this.relish = '';
    }
  }
  updateRelish(event: MatRadioChange) {
    this.relish = event.value + '- relish';
  }
  lettuceChecked(event: MatCheckboxChange) {
    if(event.checked) {
      this.checkLettuce = true;
      this.lettuce = ' lettuce';
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
      this.tomato = ' tomato';
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
      this.onions = ' onions';
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
      this.salt = ' salt';
    } else {
      this.checkSalt = false;
      this.salt = '';
    }
  }
  updateSalt(event: MatRadioChange) {
    this.salt = event.value + '- salt';
  }
  pepperChecked(event: MatCheckboxChange) {
    if(event.checked) {
      this.checkPepper = true;
      this.pepper = ' pepper';
    } else {
      this.checkPepper = false;
      this.pepper = '';
    }
  }
  updatePepper(event: MatRadioChange) {
    this.pepper = event.value + '- pepper';
  }
  cheeseChecked(event: MatCheckboxChange) {
    if(event.checked) {
      this.checkCheese = true;
      this.cheese = ' cheese';
    } else {
      this.checkCheese = false;
      this.cheese = '';
    }
  }
  updateCheese(event: MatRadioChange) {
    this.cheese = event.value + '- cheese';
  }
  picklesChecked(event: MatCheckboxChange) {
    if(event.checked) {
      this.checkPickles = true;
      this.pickles = ' pickles';
    } else {
      this.checkPickles = false;
      this.pickles = '';
    }
  }
  updatePickles(event: MatRadioChange) {
    this.pickles = event.value + '- pickles';
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
    this.bacon = event.value + '- bacon';
  }
  friedOnionsChecked(event: MatCheckboxChange) {
    if(event.checked) {
      this.checkFriedOnions = true;
      this.friedOnions = ' fried onions';
    } else {
      this.checkFriedOnions = false;
      this.friedOnions = '';
    }
  }
  updateFriedOnions(event: MatRadioChange) {
    this.friedonions = event.value + '- fried onions';
  }
  sauceChecked(event: MatCheckboxChange) {
    if(event.checked) {
      this.checkSauce = true;
      this.sauce = ' sauce';
    } else {
      this.checkSauce = false;
      this.sauce = '';
    }
  }
  updateSauce(event: MatRadioChange) {
    this.sauce = event.value + '- sauce';
  }

  addToOrder() {
    const condimentArray: string[] = [this.ketchup, this.mustard, this.lettuce, this.mayonaise, this.relish, this.tomato, this.onions, this.salt, this.pepper, this.cheese, this.rainbowJimmies, this.chocolateJimmies, this.crunchCoat, this.wetWalnuts, this.mm, this.chocolateDipTop, this.peanutButterDipTop, this.peanutsCandy];
    const filteredCondiments = condimentArray.filter(e => e !== '');
    console.log('filteredCondiments', filteredCondiments);
    console.log('mayonaise', this.mayonaise);

  }

  ngOnDestroy(){
    this.condimentsForm.reset();
    this.toppingsForm.reset();
    this.showCondimentsSubscription.unsubscribe();
    this.foodSelectedSubscription.unsubscribe();
    this.subNoToppings.unsubscribe();
    this.subTemporaryFood.unsubscribe();
    this.subHandDipped.unsubscribe();
  }

}
