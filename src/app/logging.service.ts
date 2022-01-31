import { Injectable } from "@angular/core";

@Injectable() // not required for incjected services, but recommended
export class LoggingService {
    
    logStatusChange(status:string) {
        console.log('A server status changed, new status: ' + status);
    }

}