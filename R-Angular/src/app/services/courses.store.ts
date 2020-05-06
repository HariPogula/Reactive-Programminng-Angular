import { Injectable } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, shareReplay, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesStore {
  private _url = 'http://localhost:3000/';

  private subject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.subject.asObservable();

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private messageService: MessageService
  ) {
    this.loadAllCourses();
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    const courses = this.subject.getValue(); // Get the last emitted values.
    const index = courses.findIndex((course) => course.id == courseId);
    const newCourse: Course = {
      ...courses[index],
      ...changes, //To apply new changes
    };

    const newCourses: Course[] = courses.slice(0); //To copy complete array
    newCourses[index] = newCourse;

    this.subject.next(newCourses);
    return this.http.patch(this._url + 'courses/' + courseId, changes).pipe(
      catchError((err) => {
        const message = 'Could not save Course..';
        this.messageService.showErrors(message);
        return throwError(err);
      }),
      shareReplay()
    );
  }

  filterByCategory(category: string): Observable<Course[]> {
    return this.courses$.pipe(
      map((courses) =>
        courses
          .filter((course) => course.category == category)
          .sort(sortCoursesBySeqNo)
      )
    );
  }

  private loadAllCourses() {
    const loadCourses$ = this.http.get<Course[]>(this._url + 'courses').pipe(
      shareReplay(),
      catchError((err) => {
        const message = 'Cpuld not load the Courses..';
        this.messageService.showErrors(message);
        return throwError(err);
      }),
      tap((courses) => this.subject.next(courses))
    );
    this.loadingService.showLoaderUntilComplete(loadCourses$).subscribe();
  }
}
