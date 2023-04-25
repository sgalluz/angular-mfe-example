import { Route } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";

export const appRoutes: Route[] = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
