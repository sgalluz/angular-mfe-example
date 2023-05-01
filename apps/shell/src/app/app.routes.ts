import { Route } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ContactsComponent } from "./pages/contacts/contacts.component";
import { loadRemoteModule } from '@angular-architects/module-federation';

export const appRoutes: Route[] = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'products',
        loadChildren: () =>
            loadRemoteModule({
                type: 'module',
                remoteEntry: 'http://localhost:4210/remoteEntry.js',
                exposedModule: './ProductsModule'
            })
            .then(m => m.ProductsModule)
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
