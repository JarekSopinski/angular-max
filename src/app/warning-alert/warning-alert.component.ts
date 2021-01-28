import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warning-alert',
  template: `
    <p>Warning!</p>
  `,
  styles: [`
    p { color: red }
  `]
})
export class WarningAlertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
