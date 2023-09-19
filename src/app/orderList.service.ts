import { ThrowStmt } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Food } from "./order/models/food.model";

@Injectable({
    providedIn: 'root'
  })

export class OrderListService {
    orderList: Food[] = [];
    
    private foodSelectedUpdate = new Subject<string>();
    private orderListUpdate = new Subject<Food[]>();
    private openTopping = new Subject<Boolean>();
    private openCondiment = new Subject<Boolean>();
    private showCondiment = new Subject<Boolean>();
    private noToppingsUpdate = new Subject<Boolean>();
    private handDippedUpdate = new Subject<Boolean>();
    private temporaryFoodUpdate = new Subject<string>();
    private showCondiments: boolean = false;
    private food: string = '';
    private temporaryFood: string = '';
    private noToppings: boolean = false;
    private openToppings: boolean = false;
    private openCondiments: boolean = false;
    private handDipped: boolean = false;

    totalPrice: number = 0;
    price: number = 0;
    private priceUpdate = new Subject<number>();
    private totalPriceUpdate = new Subject<number>();
    constructor() {}

    updateHandDipped(handDipped: boolean) {
        this.handDipped = handDipped;
        this.getHandDipped();

    }

    updateTemporaryFood(temporaryFood: string) {
        this.temporaryFood = temporaryFood;
        this.temporaryFoodUpdate.next(this.temporaryFood);
    }
    updateOpenCondiments(openCondiments: boolean) {
        if(openCondiments === true) {
            this.openCondiments = false;
            this.openCondiment.next(this.openCondiments);
        } else {
            this.openCondiments = true;
            this.openCondiment.next(this.openCondiments);
        }
    }
    updateOpenToppings(openToppings: boolean) {
        if(openToppings === true) {
            this.openToppings = false;
            this.openTopping.next(this.openToppings);
        } else {
            this.openToppings = true;
            this.openTopping.next(this.openToppings);
        }
    }
    closeToppings(foodSelected, price: number, noToppings: boolean) {
        if(this.openToppings === true){
            this.openToppings = false;
        } else {
            this.openToppings = true;
            this.showCondiments = false;
        }
        this.showCondiment.next(this.showCondiments);
        this.openTopping.next(this.openToppings);
        if(this.openCondiments === true) {
            this.openCondiments = false;
        }
        this.temporaryFood = foodSelected;
        this.food = foodSelected;
        this.getFoodSelected();
        this.getTemporaryFood();
        this.price = price;
        this.noToppings = noToppings;
        this.noToppingsUpdate.next(this.noToppings);
        this.openCondiment.next(this.openCondiments);
        this.openTopping.next(this.openToppings);
    }
    closeCondiments(price: number, foodSelected: string, description: string, noTopping: boolean) {
        if(this.openCondiments === true){
            this.openCondiments = false;
            this.noToppings = noTopping;
            this.getNoToppings();
        } else {
            this.openCondiments = true;
            this.showCondiments = true;
            this.showCondiment.next(this.showCondiments);
            this.price = price;
            this.addToPrice(this.price);
            this.food = foodSelected;
            this.getFoodSelected();
            this.noToppings = noTopping;
            this.getNoToppings();
        }
        this.openCondiment.next(this.openCondiments);
        if(this.openToppings === true) {
            this.openToppings = false;
            this.openTopping.next(this.openToppings);
        }     
    }
    addToOrder(orderName: string, itemPrice: number, condiments: string[], comments: string) {
        console.log('this food', this.food);
        let price;
        let name = '';
        if(orderName != undefined) {
            name = this.food + orderName;
        } else {
            name = this.food;
        }
        console.log('name', name); 
        price = this.price + itemPrice;
        this.totalPrice = this.totalPrice + price;
        this.getTotalPrice(); 
        const food = {name, price, condiments, comments}
        this.orderList.push(food);
        this.orderList.reverse();
        this.orderListUpdate.next([...this.orderList]);
        this.price = 0;
        this.temporaryFood = '';
        this.openToppings = false;
        this.openCondiments = false;
        this.getTemporaryFood();
        this.getOpenCondiments();
        this.getOpenToppings();
        this.price = 0;
    }

    clearOrder() {
        this.totalPrice = 0;
        this.orderList = [];
        this.totalPriceUpdate.next(this.totalPrice);
        this.orderListUpdate.next(this.orderList);
    }
    removeItem(index, itemPrice: number) {
        this.orderList.splice(index,1);
        this.subtractFromPrice(itemPrice);
        this.orderListUpdate.next(this.orderList);
    }
    addToPrice(price: number) {
        this.price = price;
        this.priceUpdate.next(this.price);
    }
    subtractFromPrice(price: number) {
        this.totalPrice = this.totalPrice - price;
        this.priceUpdate.next(this.price);
        this.totalPriceUpdate.next(this.totalPrice);
    }
    handDippedListener() {
        return this.handDippedUpdate.asObservable();
    }
    temporaryFoodListener() {
        return this.temporaryFoodUpdate.asObservable();
    }
    openshowCondimentsListener() {
        return this.showCondiment.asObservable();
    }
    openToppingsListener() {
        return this.openTopping.asObservable();
    }
    openCondimentsListener() {
        return this.openCondiment.asObservable();
    }
    getpriceListener() {
        return this.priceUpdate.asObservable();
    }
    getTotalPriceListener() {
        return this.totalPriceUpdate.asObservable();
    }
    getorderlistListener() {
        return this.orderListUpdate.asObservable();
    }
    getFoodSelectedListener() {
        return this.foodSelectedUpdate.asObservable();
    }
    noToppingsListener() {
        return this.noToppingsUpdate.asObservable();
    }
    getTemporaryFood() {
        this.temporaryFoodUpdate.next(this.temporaryFood);
    }
    getFoodSelected() {
        this.foodSelectedUpdate.next(this.food)
    }
    getOpenCondiments() {
        this.openCondiment.next(this.openCondiments);
    }
    getOpenToppings() {
        this.openTopping.next(this.openToppings);
    }
    getNoToppings() {
        this.noToppingsUpdate.next(this.noToppings);
    }

    openshowCondiments() {
        this.showCondiment.next(this.showCondiments);
    }
    getOrder() {
        this.orderListUpdate.next(this.orderList);
    }
    getHandDipped() {
        this.handDippedUpdate.next(this.handDipped);
    }
    getTotalPrice() {
        this.totalPriceUpdate.next(this.totalPrice);
    }


   
}
