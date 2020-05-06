import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../model/course';
import * as moment from 'moment';
import { CourseService } from '../services/course.service';
import { LoadingService } from '../services/loading.service';
import { MessageService } from '../services/message.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CoursesStore } from '../services/courses.store';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss'],
  providers: [LoadingService, MessageService],
})
export class CourseDialogComponent implements OnInit {
  form: FormGroup;

  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
    public courseStore: CoursesStore,
    public messageService: MessageService
  ) {
    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required],
    });
  }
  ngOnInit(): void {}

  save() {
    const changes = this.form.value;
    this.courseStore.saveCourse(this.course.id, changes).subscribe();
    this.dialogRef.close(changes);

    // this.coursesStore.saveCourse(this.course.id, changes).subscribe();

    // this.dialogRef.close(changes);
  }

  close() {
    this.dialogRef.close();
  }
}
