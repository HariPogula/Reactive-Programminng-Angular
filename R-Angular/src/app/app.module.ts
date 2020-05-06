import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { MessagesComponent } from './messages/messages.component';
import { LoadingComponent } from './loading/loading.component';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { CoursesCardListComponent } from './courses-card-list/courses-card-list.component';
import { SafeurlPipe } from './pipes/safeurl.pipe';
import { LoadingService } from './services/loading.service';
import { MessageService } from './services/message.service';
@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    LoadingComponent,
    HomeComponent,
    CourseComponent,
    CourseDialogComponent,
    CoursesCardListComponent,
    SafeurlPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [LoadingService, MessageService],
  bootstrap: [AppComponent],
  entryComponents: [CourseDialogComponent],
})
export class AppModule {}
