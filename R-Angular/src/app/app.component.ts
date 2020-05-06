import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoadingService, MessageService],
})
export class AppComponent {
  title = 'R-Angular';
}
