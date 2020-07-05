import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, ActivatedRouteSnapshot } from '@angular/router';
import { CommonsService } from './services/commons.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'APP-TECH U';
  constructor(
    private titleService: Title,
    private router: Router,
    private commonsService: CommonsService,
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.commonsService.openModalLoading();
    }
    if (event instanceof NavigationEnd) {
      this.commonsService.closeModalLoading();
      this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root));
    }
    if (event instanceof NavigationCancel) {
      this.commonsService.closeModalLoading();
    }
    if (event instanceof NavigationError) {
      this.commonsService.closeModalLoading();
    }
  } 

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
    let title: string = (routeSnapshot.data && routeSnapshot.data['title']) ? routeSnapshot.data['title'] : 'SIGAL - Principal';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }
}
