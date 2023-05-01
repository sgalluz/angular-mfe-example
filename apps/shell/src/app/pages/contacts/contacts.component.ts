import { Component } from '@angular/core';

type TeamMember = {
  name: string,
  role: string,
  profileImage: string
}

@Component({
  selector: 'shell-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  team: TeamMember[] = [
    {
      name: 'Yoda',
      role: 'Jedi Master',
      profileImage: '/assets/img/yoda.png'
    },
    {
      name: 'Mace Windu',
      role: 'Jedi Master',
      profileImage: '/assets/img/windu.jpeg'
    },
    {
      name: 'Obi-Wan Kenobi',
      role: 'Jedi Master',
      profileImage: '/assets/img/kenobi.jpeg'
    }
  ]
}
