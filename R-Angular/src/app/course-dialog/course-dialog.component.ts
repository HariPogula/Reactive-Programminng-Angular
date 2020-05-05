import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../model/course';
import * as moment from 'moment';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss'],
})
export class CourseDialogComponent implements OnInit {
  form: FormGroup;

  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
    public courseService: CourseService
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
    this.courseService
      .saveCourse(this.course.id, this.form.value)
      .subscribe((val) => {
        this.dialogRef.close(val);
      });

    // this.coursesStore.saveCourse(this.course.id, changes).subscribe();

    // this.dialogRef.close(changes);
  }

  close() {
    this.dialogRef.close();
  }
}
