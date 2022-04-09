import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error:HttpErrorResponse = null;

  constructor(
    private postsService: PostsService
    ) {}

  ngOnInit() {
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
        this.error = error.message;
        console.log(error);
      }
    )
  }

}
