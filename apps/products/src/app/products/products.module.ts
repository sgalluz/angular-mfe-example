import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ProductCardComponent } from "../components/product-card/product-card.component";
import { ProductDetailComponent } from "../pages/product-detail/product-detail.component";
import { ProductListComponent } from "../pages/product-list/product-list.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductCardComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild([
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
    ])
  ],
  providers: []
})
export class ProductsModule {}
  