import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CommonsService } from '../../services/commons.service';

@Component({
  selector: 'app-breadcumb',
  templateUrl: './breadcumb.component.html',
  styleUrls: ['./breadcumb.component.css']
})
export class BreadcumbComponent implements OnInit {

  public listBreadcumb: Array<Object>;
  public singleBreadcumb: string;

  constructor(
    private router: Router,
    private commonsService: CommonsService
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.listBreadcumb = this.getListBreadcumb(this.router.routerState.snapshot.root);
        this.singleBreadcumb = null;
      }
    });

    this.commonsService.getEventBreadcumb().subscribe((breadcumb) => {
      this.singleBreadcumb = breadcumb;
    });
  }

  private getListBreadcumb(routeSnapshot: ActivatedRouteSnapshot) {
    let listBreadcumb: Array<Object> = (routeSnapshot.data && routeSnapshot.data['breadcumb']) ? routeSnapshot.data['breadcumb'] : [];
    if (routeSnapshot.firstChild) {
      listBreadcumb = this.getListBreadcumb(routeSnapshot.firstChild) || listBreadcumb;
    }
    return listBreadcumb;
  }

}
