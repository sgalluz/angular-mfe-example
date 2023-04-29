import { Component, Input } from '@angular/core';

export type NavbarLink = {
  route?: string | string[],
  label: string
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'shell-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  @Input() title?: string;
  @Input() hasLogo = true;
  @Input() links?: NavbarLink[];

}
