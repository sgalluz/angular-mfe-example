import { Routes } from "@angular/router";
import { ProductListComponent } from "./pages/product-list/product-list.component";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";

export const productsRoutes: Routes = [
    {
        path: '',
        component: ProductListComponent
    },
    {
        path: ':id',
        component: ProductDetailComponent
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: ''
    }
]