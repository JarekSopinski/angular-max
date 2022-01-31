import { Injectable } from "@angular/core";

@Injectable()
export class CounterService {

    changesToActive = 0;
    changesToInactive = 0;

    incrementChangesToActive(){
        this.changesToActive++;
        console.log('Changes to Active: ' + this.changesToActive);
    }

    incrementChangesToInactive(){
        this.changesToInactive++;
        console.log('Changes to Inactive: ' + this.changesToInactive);
    }

}