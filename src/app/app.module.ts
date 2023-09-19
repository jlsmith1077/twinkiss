import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule} from'@angular/material/expansion';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { CheckOutComponent } from './order/check-out/check-out.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { MenuComponent } from './menu/menu.component';
import { CondimentsComponent } from './order/condiments/condiments.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { FoodToppingsComponent } from './menu/menu-list/food-toppings/food-toppings.component';
import { OrderListComponent } from './menu/menu-list/order-list/order-list.component';
import { ShakeMaltsComponent } from './menu/shake-malts-list/shake-malts.component';
import { SodaListComponent } from './menu/soda-list/soda-list.component';
import { IcecreamListComponent } from './menu/icecream-list/icecream-list.component';
import { WatericeListComponent } from './menu/waterice-list/waterice-list.component';
import { GelatiListComponent } from './menu/gelati-list/gelati-list.component';
import { SundaeListComponent } from './menu/sundae-list/sundae-list.component';
import { ArticSwirlListComponent } from './menu/artic-swirl-list/artic-swirl-list.component';
import { SherbertListComponent } from './menu/sherbert-list/sherbert-list.component';
import { YogurtListComponent } from './menu/yogurt-list/yogurt-list.component';
import { SlushiesListComponent } from './menu/slushies-list/slushies-list.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';




@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HomeComponent,
    MenuComponent,
    OrderComponent,
    CheckOutComponent,
    CondimentsComponent,
    MenuListComponent,
    FoodToppingsComponent,
    OrderListComponent,
    ShakeMaltsComponent,
    SodaListComponent,
    IcecreamListComponent,
    WatericeListComponent,
    GelatiListComponent,
    SundaeListComponent,
    ArticSwirlListComponent,
    SherbertListComponent,
    YogurtListComponent,
    SlushiesListComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    MatBadgeModule,
    MatCardModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
