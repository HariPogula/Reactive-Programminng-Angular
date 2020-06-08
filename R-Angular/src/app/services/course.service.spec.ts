import { TestBed } from '@angular/core/testing';

import { CourseService } from './course.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Course } from './../model/course';

fdescribe('CourseService', () => {
  let service: CourseService;
  let httpTestingController: HttpTestingController;
  let _url = 'http://localhost:3000/';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

      providers: [CourseService],
    });
    service = TestBed.inject(CourseService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all courses', () => {
    service.getAllCourses().subscribe((x) => {
      expect(x).toBeTruthy();
      expect(x).length > 1;
    });

    const req = httpTestingController.expectOne(_url + 'courses');
    expect(req.request.method).toEqual('GET');
    //req.flush(Course[]);
  });

  it('should save the course', () => {
    const changes: Partial<Course> = {
      description: 'A new Test Description',
    };

    service
      .saveCourse('3', changes)
      .subscribe(() => fail('the save course operation is failed.'));

    const req = httpTestingController.expectOne(_url + 'courses/' + 3);
    expect(req.request.method).toEqual('PATCH');
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
