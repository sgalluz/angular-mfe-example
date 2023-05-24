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
      transition('void => *', [ 
        style({ opacity: 0 }),
        animate(
          '.3s ease-in',
          style({ opacity: 1 })
        )
      ]),
      transition('* => void', [
        animate(
          '.3s ease-out', 
          style({ opacity: 0 })
        ) 
      ])
    ])
  ]
})
export class ProfileBadgeComponent {

  @Input() route!: string;
  @Input() details?: ProfileDetails;

  isModalVisible = false;

}
