import { Component, OnInit } from '@angular/core';
import { NavbarLink } from '../navbar/navbar.component';
import { ProfileDetails } from '../profile-badge/profile-badge.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'shell-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  links: NavbarLink[] = [];
  details?: ProfileDetails;

  ngOnInit(): void {
    this.links = [
      {
        label: 'Products',
        route: ['/products']
      },
      {
        label: 'Contacts',
        route: ['/contacts']
      },
      {
        label: 'Others...'
      }
    ];

    this.details = {
      firstName: 'Chewbacca',
      lastName: 'The Wookie',
      username: 'Chewie',
      image: 'assets/img/chewbacca.jpeg'
    }
  }
}
