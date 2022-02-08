import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute // access current route
  ) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'], // 'id' as definied in routes array in app module
      name: this.route.snapshot.params['name'] // as above
    };
    this.paramsSubscription = this.route.params // params is an observable, opposing to snapshot
      .subscribe(
        (params: Params) => { // 'params' here are UPDATED params
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      );
  }

  ngOnDestroy(): void {
    // Unsubscibing manually in not required, Angular does it automatically.
    // This is just an example how to clean up subscription manually.
      this.paramsSubscription.unsubscribe();
  }

}
