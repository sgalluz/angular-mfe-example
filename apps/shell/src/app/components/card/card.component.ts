import { Component, Input } from '@angular/core';

@Component({
  selector: 'shell-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {

  @Input() image?: string;
  @Input() name?: string;
  @Input() description?: string;

}
