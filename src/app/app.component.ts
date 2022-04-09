import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  errorMessage: string = null;
  private errorSub: Subscription

  constructor(
    private postsService: PostsService
    ) {}

  ngOnInit() {
    this.errorSub = this.postsService.errorSubject.subscribe(errorMessage => {
      this.isFetching = false;
      this.errorMessage = errorMessage;
      console.log(this.errorMessage);
    });
    this.outputPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.outputPosts();
  }

  onClearPosts() {
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  outputPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
      }, error => {
        this.isFetching = false;
        this.errorMessage = error.message;
        console.log(error);
      }
    )
  }

  onHandleError() {
    this.errorMessage = null;
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

}
