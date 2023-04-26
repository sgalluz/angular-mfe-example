import { Route } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { ContactsComponent } from "./pages/contacts/contacts.component";

export const appRoutes: Route[] = [
    {
        path: 'home',
        component: HomeComponent
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
