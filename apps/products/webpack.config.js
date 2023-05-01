const { share, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'products',

  exposes: {
    './ProductsModule': './apps/products/src/app/products/products.module.ts',
  },

  shared: share({
    "@angular/core": {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    },
    "@angular/common": {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    },
    "@angular/common/http": {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    },
    "@angular/forms": {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    },
    "@angular/platform-browser": {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    },
    "@angular/platform-browser-dynamic": {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    },
    "@angular/router": {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    },
    "@fortawesome/angular-fontawesome": {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    },
    "@fortawesome/fontawesome-svg-core": {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    },
    "@fortawesome/free-brands-svg-icons": {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    },
    "@fortawesome/free-solid-svg-icons": {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    }
  })

});
