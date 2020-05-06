import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { CourseService } from '../services/course.service';
import { map, finalize, catchError } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { MessageService } from '../services/message.service';
import { CoursesStore } from '../services/courses.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;
  constructor(public courseStore: CoursesStore) {}

  ngOnInit(): void {
    this.reloadCourses();
  }

  reloadCourses() {
    this.beginnerCourses$ = this.courseStore.filterByCategory('BEGINNER');
    this.advancedCourses$ = this.courseStore.filterByCategory('ADVANCED');
  }

  reloadCoursesOld() {
    // this.loadingService.loadingOn();
    //Get the courses and sort them by sortCoursesBySeqNo()
    //   const courses$ = this.courseService.getAllCourses().pipe(
    //     map((courses) => courses.sort(sortCoursesBySeqNo)),
    //     catchError((err) => {
    //       const message = 'Could not load courses';
    //       this.messageService.showErrors(message);
    //       // console.log('Error is ' + message, err);
    //       return throwError(err);
    //     })
    //   );
    //   const loadingCourses$ = this.loadingService.showLoaderUntilComplete(
    //     courses$
    //   );
    //   //finalize(() => this.loadingService.loadingOff());
    //   //Then assign values. We are NOT subscribing instead we are using async in template.
    //   //Async pipe will subscribe and unsubscribe to avoid memory leaks.
    //   this.beginnerCourses$ = loadingCourses$.pipe(
    //     map((courses) =>
    //       courses.filter((course) => course.category == 'BEGINNER')
    //     )
    //   );
    //   this.advancedCourses$ = loadingCourses$.pipe(
    //     map((courses) =>
    //       courses.filter((course) => course.category == 'ADVANCED')
    //     )
    //   );
  }
}
