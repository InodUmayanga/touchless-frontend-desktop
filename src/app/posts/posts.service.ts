import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';
import { Activity } from './post.model';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private activity: Activity;
  private session: any;
  private postsUpdated = new Subject<Post[]>();
  private activityUpdated = new Subject<Activity[]>();

  responseSession: JSON;

  constructor(private http: HttpClient) { }

  getPosts() {
    this.http
      .get<{ message: string, posts: any }>(
        BACKEND_URL
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListner() {
    return this.postsUpdated.asObservable();
  }

  getSessionUpdateListner() {
    return this.activityUpdated.asObservable();
  }

  setPost(title: string, content: string) {
    const post: Post = { id: null, title, content };

    this.http
      .post<{ message: string }>(BACKEND_URL, post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  addActivityInVehicle(plateNumber: string) {
    const entranceActivity = {
      Activity: {
        Entrance: {
          SessionID: 143,
          INAgentMACID: '00-14-22-01-63-45',
          PlateNumber: {
            Image: '/poll/data/date1/img.png',
            Number: plateNumber,
            TimeStamp: Date.now()
          }
        }
      }
    };

    console.log('sending activity', JSON.stringify(entranceActivity));

    this.http.post<{ message: string, response: any }>(BACKEND_URL + 'enter', entranceActivity)
      .subscribe((transformedActivities) => {
        this.activity = transformedActivities.response;
        this.activityUpdated.next([this.activity]);
      });
  }

  addActivityOutVehicle(plateNumber: string) {
    const exitActivity = {
      Activity: {
        Exit: {
          OUTAgentMACID: '00-14-22-01-63-45',
          PlateNumber: {
            Image: '/poll/data/date1/img.png',
            Number: plateNumber,
            TimeStamp: Date.now()
          }
        }
      }
    };

    console.log('sending activity', JSON.stringify(exitActivity));

    this.http.post<{ message: string, response: any }>(BACKEND_URL + 'exit', exitActivity)
      .subscribe((transformedActivities) => {
        this.activity = transformedActivities.response;
        console.log('leaving activity', this.activity);

        this.activityUpdated.next([this.activity]);
      });
  }

}
