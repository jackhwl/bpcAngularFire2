import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef} from '@angular/core';
import { removeNgStyles, createNewHosts, createInputTransfer} from '@angularclass/hmr';
import { RouterModule, PreloadAllModules} from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
// // for auth    
 import {AngularFireAuthModule} from 'angularfire2/auth';
// // for database
import {AngularFireDatabaseModule} from 'angularfire2/database';
//import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

import { StoreModule } from '@ngrx/store';
import { menuReducer } from './reducers/menu.reducer';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS, firebaseConfig } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { InternalStateType } from './app.service';
import { HomeComponent } from './home';
import { HeaderComponent } from './header';
import { FooterComponent } from './footer';
//import { BlogDetailComponent } from './blogDetail/blog-detail.component';
import { AboutComponent } from './about';
//import { WidgetComponent } from './widget';
import { NoContentComponent } from './no-content';
import { XLargeDirective } from './home/x-large';

//import 'script-loader!jquery';
//import 'bootstrap/dist/js/bootstrap.bundle.js';
//import 'bootstrap/dist/js/bootstrap.min.js';
//import 'popper.js';
//import 'bootstrap/js/dist/dropdown';
//import 'script-loader!quill';
//import 'quill/dist/quill.js';

//import 'firebase/firebase.js';
//import * as firebase from 'firebase';
//import 'css-loader!bootstrap';
//import 'css-loader!quill';

import '../styles/styles.scss';
import '../styles/headings.css';
//import 'bootstrap/dist/css/bootstrap.css'
//import 'quill/dist/quill.core.css';
//import 'quill/dist/quill.snow.css';

import { AdminModule } from './admin/admin.module';
import { CoreModule } from './core/core.module';
import { EnvService, MenuService, AuthGuard, AuthService } from './core/services';
import { EffectsModule } from '@ngrx/effects';
import { miscReducer } from './reducers/misc.reducer';
import { MiscEffects } from './effects/misc.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MenuEffects } from './effects/menu.effects';


// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS
  //AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    //BlogDetailComponent,
    //WidgetComponent,
    NoContentComponent,
    XLargeDirective
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AdminModule,
    CoreModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
    StoreModule.forRoot({menus: menuReducer, misc: miscReducer}),
    EffectsModule.forRoot([MiscEffects, MenuEffects]),
    StoreDevtoolsModule.instrument()
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
    EnvService,
    MenuService,
    AuthGuard,
    AuthService
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    //public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    /**
     * Set state
     */
    //this.appState._state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    //const state = this.appState._state;
    //store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues  = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
