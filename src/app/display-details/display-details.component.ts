import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'display-details',
  templateUrl: './display-details.component.html',
  styleUrls: ['./display-details.component.scss']
})
export class DisplayDetailsComponent implements OnInit {

  areDetailsDisplayed = false;
  buttonClicks = [];

  constructor() { }

  ngOnInit(): void {
  }

  toggleDetailsDisplayed() {
    this.areDetailsDisplayed = !this.areDetailsDisplayed;
  }

  logButtonClick() {
    const clickId = this.buttonClicks.length + 1;
    this.buttonClicks.push(clickId);
  }

}
