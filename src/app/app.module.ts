import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [{
    // register a service under a different identifier
    provide: HTTP_INTERCEPTORS, // a token for interceptors
    useClass: AuthInterceptorService, // point to your own class used as an interceptor
    multi: true // can have more than one interceptor?
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
