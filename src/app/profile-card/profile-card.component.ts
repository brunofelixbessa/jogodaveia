import { User } from '../model.user';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {

  constructor() { }

  @Input() user: User;
  @Output() logoutClick: EventEmitter<null> = new EventEmitter<null>();

  logout() {
    this.logoutClick.emit();
  }
}
