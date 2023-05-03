import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarLink } from '../navbar/navbar.component';
import { ProfileDetails } from '../profile-badge/profile-badge.component';
import { PubSubService, SubscriptionToken } from '@angular-mfe-example/mfe-core';

@Component({
  selector: 'shell-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  links: NavbarLink[] = [];
  details?: ProfileDetails;
  cartItemsCount = 0;

  private pubSubTokens: SubscriptionToken[] = [];

  constructor(private readonly _pubSub: PubSubService) {}

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

    this.pubSubTokens.push(
      this._pubSub.subscribe('ITEM_ADDED_TO_CART', payload => {
        console.log('subscribed to ', payload);
        this.cartItemsCount += payload.quantity;
      })
    );
  }

  ngOnDestroy(): void {
    this.pubSubTokens.forEach(this._pubSub.unsubscribe);
  }
}
