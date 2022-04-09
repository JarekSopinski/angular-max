import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';

import { Post } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostsService {

    apiUrl:string = 'https://angular-max-334a3-default-rtdb.firebaseio.com';

    constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string) {
        const postData: Post = {
            title: title,
            content: content
        };
        this.http.post<{ name: string }>(
            `${this.apiUrl}/posts.json`,
            postData
          ).subscribe(responseData => {
            console.log(responseData);
        });
    }

    fetchPosts() {
        // We don't subscribe here, only return the result, while subscription happens in the component,
        // so that component can output returned data!
        return this.http.get<{ [key: string]: Post }>(
            `${this.apiUrl}/posts.json`
            )
            .pipe(
              map(responseData => {
                // convert object into an array
                const postsArray: Post[] = [];
                for (const key in responseData){
                  responseData.hasOwnProperty(key) && postsArray.push({ ...responseData[key], id: key });
                }
                return postsArray;
              })
            );
    }

    deletePosts() {
        // As in fetch, we don't subscribe here, only return for component.
       return this.http.delete(`${this.apiUrl}/posts.json`);
    }

}