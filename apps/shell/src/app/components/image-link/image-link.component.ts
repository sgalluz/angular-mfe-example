import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

type ImageLinkDirection = 'right' | 'left';
type ImageLinkTheme = 'orange' | 'blue';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'shell-image-link',
  templateUrl: './image-link.component.html',
  styleUrls: ['./image-link.component.scss'],
})
export class ImageLinkComponent implements OnChanges {

  @Input() direction: ImageLinkDirection = 'right';
  @Input() image?: string;
  @Input() route?: string[];
  @Input() theme!: ImageLinkTheme;
  @Input() linkText!: string;

  bgImage?: string;
  styles?: string;

  ngOnChanges(changes: SimpleChanges): void {
    const newBgImage = changes?.['image']?.currentValue;
    if (!!newBgImage && this.bgImage !== newBgImage) {
      this.bgImage = `url(${newBgImage})`;
    }

    this.styles = [this.theme, this.direction].filter(t => !!t).join(' ');
  }
}
