import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import { ProductListComponent } from "./pages/product-list/product-list.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ExtendedRouter, MfeConfigService, MfeModule, MFE_MODULE_PROVIDERS } from "@angular-mfe-example/mfe-core";
import { productsRoutes } from "./products.routes";

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductCardComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(productsRoutes)
  ],
  providers: [
    ...MFE_MODULE_PROVIDERS
  ]
})
export class ProductsModule extends MfeModule {
  constructor(router: ExtendedRouter, mfeConfig: MfeConfigService) {
    super(router, mfeConfig);
  }
}
  