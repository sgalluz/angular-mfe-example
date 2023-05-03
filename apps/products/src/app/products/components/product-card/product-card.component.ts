import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ViewMode } from '../../models/view.mode';
import { PubSubService } from '@angular-mfe-example/mfe-core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'products-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {

  @Input() product?: Product;
  @Input() mode: ViewMode = 'list';

  constructor(private readonly _pubSub: PubSubService) {}

  onAddToCart = ($event: MouseEvent, id: string) => {
    $event.preventDefault();
    $event.stopPropagation();
    this._pubSub.publish({ topic: 'ITEM_ADDED_TO_CART', payload: { id, quantity: 1 }});
  }
}
