import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm:FormGroup;
  statusOptions = [
    'stable',
    'critical',
    'finished'
  ];

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, Validators.required, this.projectNameValidator),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('stable')
    });
  }

  onSubmit(){
    console.log(this.projectForm);
  }

  projectNameValidator(control:FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({'projectNameIsForbidden': true})
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

}