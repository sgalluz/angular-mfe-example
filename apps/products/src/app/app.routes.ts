import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: ''
    }
];
