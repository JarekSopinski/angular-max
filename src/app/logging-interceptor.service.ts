import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

export class LoggingInterceptorService implements HttpInterceptor {

    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
        ): Observable<HttpEvent<any>> {

        console.log('Response passed through Logging Interceptor!');

        return next.handle(req).pipe(
            tap(event => {
                event.type === HttpEventType.Response && console.log('Incoming Logging Response');
            })
        )
    }

}