import { Component } from '@angular/core';
import { NavbarLink } from '../navbar/navbar.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'shell-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  links: NavbarLink[] = [
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
}
