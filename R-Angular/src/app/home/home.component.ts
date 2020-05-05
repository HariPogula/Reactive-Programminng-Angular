import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { CourseService } from '../services/course.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;
  constructor(public courseService: CourseService) {}

  ngOnInit(): void {
    this.reloadCourses();
  }

  reloadCourses() {
    //Get the courses and sort them by sortCoursesBySeqNo()
    const courses$ = this.courseService
      .getAllCourses()
      .pipe(map((courses) => courses.sort(sortCoursesBySeqNo)));
    //Then assign values. We are NOT subscribing instead we are using async in template.
    //Async pipe will subscribe and unsubscribe to avoid memory leaks.
    this.beginnerCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == 'BEGINNER')
      )
    );

    this.advancedCourses$ = courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == 'ADVANCED')
      )
    );
  }
}
