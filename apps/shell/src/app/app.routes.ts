import { Route } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ContactsComponent } from "./pages/contacts/contacts.component";
import { RouteLoader } from "@angular-mfe-example/mfe-core";

export const appRoutes: Route[] = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'products',
        loadChildren: () => new RouteLoader('products').lazyLoadRemoteModule('products')
    },
    {
        path: 'contacts',
        component: ContactsComponent
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
