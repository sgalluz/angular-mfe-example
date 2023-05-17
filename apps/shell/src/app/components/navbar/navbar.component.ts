import { Component, Input } from '@angular/core';

export type NavbarLink = {
  route?: string | string[],
  label: string
}

@Component({
  selector: 'shell-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  @Input() withHomeLink = false;
  @Input() title?: string;
  @Input() hasLogo = true;
  @Input() links?: NavbarLink[];

}
