import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';

import { Post } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostsService {

    errorSubject = new Subject<string>();
    apiUrl:string = 'https://angular-max-334a3-default-rtdb.firebaseio.com';
    apiUrlWrong:string = 'https://angular-max-334a3-default-rtdb.firebaseioERROR.com'; // for error simulation

    constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string) {
        const postData: Post = {
            title: title,
            content: content
        };
        this.http.post<{ name: string }>(
            `${this.apiUrl}/posts.json`,
            postData,
            {
                observe: 'response' // get full response object, not body itself
            }
          ).subscribe(
            responseData => {
                console.log(responseData);
            },
            error => {
                this.errorSubject.next(error.message);
            }
        );
    }

    fetchPosts() {
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('custom', 'key');

        // We don't subscribe here, only return the result, while subscription happens in the component,
        // so that component can output returned data!
        return this.http.get<{ [key: string]: Post }>(
            `${this.apiUrl}/posts.json`,
            {
                headers: new HttpHeaders({'Custom-Header': 'Hello'}),
                params: searchParams
            }
        )
        .pipe(
          map(responseData => {
            // convert object into an array
            const postsArray: Post[] = [];
            for (const key in responseData){
              responseData.hasOwnProperty(key) && postsArray.push({ ...responseData[key], id: key });
            }
            return postsArray;
          }),
          catchError(errorRes => {
              // I.e. send error to analytics server, save it to logs
              return throwError(errorRes);
          })
        );
    }

    deletePosts() {
        // As in fetch, we don't subscribe here, only return for component.
       return this.http.delete(
           `${this.apiUrl}/posts.json`,
           {
               observe: 'events',
               responseType: 'json' // json, blob, text
           }
        ).pipe(
            tap(event => {
                // tap operator allows us to execute some code withour altering the response
                console.log(event);
                // i.e. access body only if we have it
                event.type === HttpEventType.Response && console.log(event.body);
            })
        )
    }

}