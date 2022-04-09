import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {

    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
        ): Observable<HttpEvent<any>> {
        // Here we intercept the request and we can do something with it, i.e. run authorization
        console.log(`Request is on its way to url: ${req.url}`);

        // modify request (save to new var since req. is immutable)
        const modifiedRequest = req.clone({
            // i.e. add new headers
            headers: req.headers.append('Auth', 'xyz')
        })

        return next.handle(modifiedRequest). // return the result to let request continue
            pipe(tap(event => {
                event.type === HttpEventType.Response && console.log('Response arrived!');
            }))
    }

}