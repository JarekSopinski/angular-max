import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(
    private route: ActivatedRoute // access current route
  ) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'], // 'id' as definied in routes array in app module
      name: this.route.snapshot.params['name']
    };
  }

}
