import { Route } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ContactsComponent } from "./pages/contacts/contacts.component";
import { RouteLoader } from "@angular-mfe-example/mfe-core";
import { LoginComponent } from "./pages/login/login.component";
import { AppWrapperComponent } from "./components/app-wrapper/app-wrapper.component";
import { authGuard } from "./guards/auth.guard";

export const appRoutes: Route[] = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: AppWrapperComponent,
        canActivate: [authGuard],
        children: [
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
        ] 
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
