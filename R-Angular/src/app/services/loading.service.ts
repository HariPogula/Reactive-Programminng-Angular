import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, observable, of } from 'rxjs';
import { tap, concatMap, finalize } from 'rxjs/operators';

@Injectable()
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();
  constructor() {}
  showLoaderUntilComplete<T>(obs$: Observable<T>): Observable<T> {
    // To Initialize the value for observable, we use of()
    return of(null).pipe(
      tap(() => this.loadingOn()),
      concatMap(() => obs$),
      finalize(() => this.loadingOff())
    );
  }
  loadingOn() {
    this.loadingSubject.next(true);
  }
  loadingOff() {
    this.loadingSubject.next(false);
  }
}
