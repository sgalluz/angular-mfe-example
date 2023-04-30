import { Route } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

export const appRoutes: Route[] = [
    {
        path: 'all',
        component: ProductListComponent
    },
    {
        path: ':id/detail',
        component: ProductDetailComponent
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'all'
    }
];
