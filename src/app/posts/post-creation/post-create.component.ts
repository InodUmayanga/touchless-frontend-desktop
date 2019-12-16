import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit, OnDestroy {
  startDate: string;
  endDate: string;

  constructor(public postsService: PostsService) { }

  inVehicle = 'Please select an option';
  vehicleIn: boolean;
  vehicleOut: boolean;
  analytics: boolean;
  private sessionSub: Subscription;

  fromDate: Date;
  toDate: Date;

  session: any;

  ngOnInit() {
    // this.postsService.getPosts();
    // this.postSub = this.postsService.getPostUpdateListner()
    //   .subscribe((posts: Post[]) => {
    //     this.posts = posts;
    //   });

    this.postsService.getSessionUpdateListner()
      .subscribe(
        (data: (any)) => {
          this.session = data;
          console.log('reterved Data', data);
        }
      );
  }


  ngOnDestroy() {
    // this.postSub.unsubscribe();
    this.sessionSub.unsubscribe();
  }


  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.postsService.setPost(form.value.title, form.value.content);
    form.resetForm();
  }


  onAddEntranceActivity(form: NgForm) {
    console.log('plate number', form.value.title);

    if (form.invalid) {
      console.log('form invalid', form.value.title);
      return;
    }
    this.postsService.addActivityInVehicle(form.value.title);
    form.resetForm();
  }

  onAddExitActivity(form: NgForm) {
    console.log('plate number', form.value.title);

    if (form.invalid) {
      console.log('form invalid', form.value.title);
      return;
    }
    this.postsService.addActivityOutVehicle(form.value.title);
    form.resetForm();
  }

  onAnalytics(form: NgForm) {


    // this.startDate = (form.value.fromDate.getTime() / 1000).toString();
    // this.endDate = (form.value.toDate.getTime() / 1000).toString();

    console.log('form date', form.value.fromDate);
    console.log('to date', form.value.toDate);


    // if (form.invalid) {
    //   return;
    // }
    // this.postsService.addActivityOutVehicle(form.value.title);
    // form.resetForm();
  }


  inFunc() {
    this.inVehicle = 'please insert entering vehicle number';
    this.vehicleIn = true;
    this.vehicleOut = false;
    this.analytics = false;

  }

  outFunc() {
    this.inVehicle = 'please insert leaving vehicle number';
    this.vehicleIn = false;
    this.vehicleOut = true;
    this.analytics = false;

  }

  anaFunc() {
    this.inVehicle = 'Session data analysis working progress not functional yet';
    this.vehicleIn = false;
    this.vehicleOut = false;
    this.analytics = true;

  }
}
