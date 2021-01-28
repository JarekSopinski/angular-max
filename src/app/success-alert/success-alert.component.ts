import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  template: `
    <p>Success!</p>
  `,
  styles: [`
    p { color: green; }
  `]
})
export class SuccessAlertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
