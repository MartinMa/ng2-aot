import {disableDebugTools} from '@angular/platform-browser';
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';

// Angular debug tools in the dev console.
let decorateModuleRef = <T>(value: T): T => value;

enableProdMode();

// Production
decorateModuleRef = (modRef: any) => {
  disableDebugTools();

  return modRef;
};

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(decorateModuleRef)
  .catch((message) => console.error(message));
