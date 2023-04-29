import { Component, Input } from '@angular/core';

export type ProfileDetails = {
  firstName: string,
  lastName: string,
  username: string,
  image?: string
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'shell-profile-badge',
  templateUrl: './profile-badge.component.html',
  styleUrls: ['./profile-badge.component.scss'],
})
export class ProfileBadgeComponent {

  @Input() route!: string;
  @Input() details?: ProfileDetails;

  // FIXME improve it for using angular animations
  isModalVisible = false;

}
