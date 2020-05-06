import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  showMessage = false;
  errors$: Observable<string[]>;

  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
    this.errors$ = this.messageService.errors$.pipe(
      tap(() => (this.showMessage = true))
    );
  }

  onClose() {
    this.showMessage = false;
  }
}
