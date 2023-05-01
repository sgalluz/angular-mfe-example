import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ViewMode } from '../../models/view.mode';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'products-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {

  @Input() product?: Product;
  @Input() mode: ViewMode = 'list';

}
