import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Food } from '../order/models/food.model';
import { OrderListService } from '../orderList.service';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';


/** @title Responsive sidenav */
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnDestroy, AfterViewInit, OnInit {
  isLoading = false;
  isMobile: number;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  subOrderList: Subscription;
  orderList: Food[] = [];
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
 .pipe(
   map(result => result.matches),
   shareReplay()
 );

  fillerNav = ['home', 'menu', 'order', 'check-out'];

  fillerContent = Array.from(
    { length: 2 },
    () =>
      `Welcome to Twin-Kiss. Please look through the menu and place your order`
  );

    

  constructor(private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private breakpointObserver: BreakpointObserver, private orderlistService: OrderListService,
    ) {
this.mobileQuery = media.matchMedia('(max-width: 600px)');
this._mobileQueryListener = () => changeDetectorRef.detectChanges();
this.mobileQuery.addListener(this._mobileQueryListener);
router.events.subscribe((event: RouterEvent) => {
  this.navigationInterceptor(event);
});
}

  ngOnInit(): void {
    this.isMobile = window.innerWidth;
  if(this.isMobile < 601) {
    this.isHandset$
  }
    this.subOrderList = this.orderlistService.getorderlistListener().
    subscribe((orderList: Food[]) => {
      this.orderList = orderList;
    });
  }

  ngAfterViewInit() {
    this.breakpointObserver.observe(['(max-width: 1024)']).subscribe((res) => {
      if(res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  loading() {
    this.isLoading = true;
  }
  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.isLoading = true;
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => { // here
        this.isLoading = false;
      }, 2000);
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      setTimeout(() => { // here
        this.isLoading = false;
      }, 2000);
    }
    if (event instanceof NavigationError) {
      setTimeout(() => { // here
        this.isLoading = false;
      }, 2000);
    }
  }
  openShowOrderList() {}

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.subOrderList.unsubscribe();
  }
}