import { AppConfigService } from './_services';

import { SidenavServiceService } from './sidenav-service.service';
import { UserComponent } from './user/user.component';
import { UserService } from './user.service';
import { Component, ViewChild, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked {

  @ViewChild('drawer', {static: true}) public drawer: MatDrawer;
  title = 'service-maintenance';
  activeMenu: string;
  myImage: any;
  widthContent;
  isLoggedIn;
  status: any;
  userLevel: string;
  response;
  mobileQuery: MediaQueryList;

  private mobileQueryListener: () => void;

  constructor(private appConfigService: AppConfigService,
    public http: HttpClient,
    public userService: UserService,
    public dialog: MatDialog,
    private route: Router,
    public sidenavService: SidenavServiceService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) {
      this.routeEvent(this.route);
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this.mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addEventListener('change', (this.mobileQueryListener));
    }

  ngOnInit() {
    // this.settings = this.appConfigService.settings;

    // this.sidenavService.sideNavToggleSubject.subscribe(() => {
    //   this.drawer.toggle();
    // });
  }

  ngAfterContentChecked() {
    this.myImage = this.userService.myImage;
    this.myImage ? this.widthContent = true : this.widthContent = false;
    this.userLoggedIn();
  }

  jobStatus(status) {
    this.status = status;
    status = status === 'wip' ? 2 : 1;
    this.userService.jobOrder = status;
    // console.log(status);
  }

  selectMenu(active) {
    this.activeMenu = active;
  }

  logout() {
    const url = '/localapi/logout';

    this.http.get(url).subscribe(res => console.log(res), err => console.log(err));
    window.location.reload();
  }

  close() {
    this.userService.myImage = '';
    return false;
  }

  userLoggedIn() {
    this.userService.userLoggedIn ? this.isLoggedIn = true : this.isLoggedIn = false;
    this.userLevel = this.userService.userLevel;
    return this.isLoggedIn;
  }

  account() {
    this.userLoggedIn() ? this.dialog.open(UserComponent) : this.isLoggedIn = false;
  }

  routeEvent(router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.activeMenu = e.url.split('/')[1];
      }
    });
  }
  
}
