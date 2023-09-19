import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Food } from '../models/food.model';
import { Condiments } from '../models/condiments.model';
import { MatRadioChange } from '@angular/material/radio';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-condiments',
  templateUrl: './condiments.component.html',
  styleUrls: ['./condiments.component.css']
})
export class CondimentsComponent implements OnInit {
  additionalComments: string;
  condimentChoice = '';
  total: number = 0;
  @Input() orderSelected = '';
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
  @Output() condiments: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() order = new EventEmitter<boolean>();
  @Output() add = new EventEmitter<string>();
  @Output() foodChosen = new EventEmitter<string>();

  condimentAmt: string[] = ['Lite','Xtra','On side'];

  // condiments: Condiments[] = [];
  // Ketchup: Condiments;
  checkKetchup = false;
  // Mustard: Condiments;
  checkMustard = false;
  // Mayonaise: Condiments;
  checkMayonaise = false;
  // Relish: Condiments;
  checkRelish = false;
  // Lettuce: Condiments;  
  checkLettuce = false;
  // Tomato: Condiments;
  checkTomato = false;
  // Onions: Condiments;
  checkOnions = false;
  // Salt: Condiments;
  checkSalt = false;
  // Pepper: Condiments;
  checkPepper = false;
  // cheese: Condiments;
  checkCheese = false;
  condimentOrder: string[];
  constructor() { }

  ngOnInit(): void {
  }
  unCheck(event: MatRadioChange, condimentEl) {
  }
  addCondiments(event: MatRadioChange, condimentEl) {
  }
  addToCondiment() {}
  ketchupChecked(event: MatCheckboxChange) {
    if(event.checked) {
      this.checkKetchup = true;
      this.ketchup = 'ketchup';
    } else {
      this.checkKetchup = false;
      this.ketchup = '';
    }
    console.log('ketchup', this.ketchup);
  }

  updateKetchup(event: MatRadioChange) {
    this.ketchup = event.value + '- ketchup';
    console.log('ketchup', this.ketchup);
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
    console.log('mustard', this.mustard);
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
    console.log('mayonaise', this.mayonaise);
  }
  relishChecked(event: MatCheckboxChange) {
    if(event.checked) {
      this.checkMayonaise = true;
      this.relish = 'relish';
    } else {
      this.checkMayonaise = false;
      this.mayonaise = '';
    }
  }
  updateRelish(event: MatRadioChange) {
    console.log('relish event', event);
    this.relish = event.value + '- relish';
    console.log('mayonaise', this.relish);
  }
  lettuceChecked(event: MatCheckboxChange) {
    if(event.checked) {
      this.checkLettuce = true;
      this.lettuce = 'lettuce';
    } else {
      this.checkLettuce = false;
      this.lettuce = '';
    }
    console.log('lettuce', this.lettuce);
  }
  updateLettuce(event: MatRadioChange) {
    console.log('lettuce event', event);
    this.lettuce = event.value + '- lettuce';
    console.log('lettuce', this.lettuce);
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
    console.log('tomato event', event);
    this.tomato = event.value + '- tomato';
    console.log('tomato', this.tomato);
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

  addToOrder() {
    const condimentArray: string[] = [this.ketchup, this.mustard, this.lettuce, this.mayonaise, this.relish, this.tomato, this.onions, this.salt, this.pepper, this.cheese];
    this.add.emit('true');
    this.order.emit(false);
    const filteredCondiments = condimentArray.filter(e => e !== '');
    this.condiments.emit(filteredCondiments);
    console.log('filteredCondiments', filteredCondiments);
    console.log('mayonaise', this.mayonaise);
    // const price = 2.10;
    // const qty_price = 0;
    // const condiments_qty = {name: qtyEl, price: 0};
    // const foodChosen: Food = {name: foodChosenEl, price: price, condiments: this.condimentChoice};
    // console.log('food chosen', foodChosen)
    // this.total = this.total + price;
    // this.total.toFixed(2);
    // console.log(this.order, 'this order');

  }
  addComments(event) {
    this.additionalComments = event.target.value;
  }

}
