import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

type ImageLinkDirection = 'right' | 'left';
type ImageLinkTheme = 'orange' | 'blue';

@Component({
  selector: 'shell-image-link',
  templateUrl: './image-link.component.html',
  styleUrls: ['./image-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageLinkComponent implements OnInit {

  @Input() direction: ImageLinkDirection = 'right';
  @Input() image?: string;
  @Input() route?: string[];
  @Input() theme!: ImageLinkTheme;
  @Input() linkText!: string;

  bgImage?: string;
  styles?: string;

  ngOnInit(): void {
    this.bgImage = `url(${this.image})` || '';
    this.styles = [this.theme, this.direction]
      .filter(t => !!t)
      .join(' ');
  }
}
