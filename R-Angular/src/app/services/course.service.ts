import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private _url = 'http://localhost:3000/';
  constructor(public http: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
    //ShareReplay() will save the result in in memeory . So if any one subsbribes to this method, the
    //data will come from in memory.
    // with out shareReplay(), if any one subsctibe to this method, that many number of calls
    // will go the backend. But with this method, the api will call only for 1 time.

    return this.http.get<Course[]>(this._url + 'courses').pipe(shareReplay());
    // .pipe(map((res) => res['payload']));
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    return this.http
      .patch(this._url + 'courses/' + courseId, changes)
      .pipe(shareReplay());
  }
}
