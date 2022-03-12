import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form', { static: false }) signupForm: NgForm;

  subscriptionOptions = [
    { value: 'basic', label: 'Basic' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'pro', label: 'Pro' }
  ];
  defaultSubscription = 'advanced';

  onSubmit() {
    console.log(this.signupForm.value);
  }

}
