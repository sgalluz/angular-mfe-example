import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

export type ProfileDetails = {
  firstName: string,
  lastName: string,
  username: string,
  image?: string
}

@Component({
  selector: 'shell-profile-badge',
  templateUrl: './profile-badge.component.html',
  styleUrls: ['./profile-badge.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'open',
        style({ opacity: 1 })
      ),
      state(
        'close',
        style({ opacity: 0 })
      ),
      transition(
        'open => close',
        [animate('.3s ease-out')]
      ),
      transition(
        'close => open',
        [animate('.3s ease-in')]
      )
    ])
  ]
})
export class ProfileBadgeComponent {

  @Input() route!: string;
  @Input() details?: ProfileDetails;

  isModalVisible = false;

}
