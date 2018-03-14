import { Routes } from '@angular/router';
import { HomeComponent } from './home';
//import { AboutComponent } from './about';
//import { WidgetComponent } from './widget';
import { NoContentComponent } from './no-content';
//import { BlogDetailComponent } from './blogDetail/blog-detail.component';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  //{ path: 'post/:sub', component: BlogDetailComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: ':menu',  component: HomeComponent },
   { path: ':menu/:sub',  component: HomeComponent },
   // { path: 'contactus',  component: HomeComponent, data: { page: 'contactus' } },
  // { path: 'mission',  component: HomeComponent, data: { page: 'mission' } },
   //{ path: 'post/:id', component: BlogDetailComponent },
  //{ path: 'about', component: AboutComponent },
  //{ path: 'widget',  component: WidgetComponent },
  //{ path: 'detail', loadChildren: './+detail#DetailModule'},
 // { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  { path: '**',    component: NoContentComponent },
];
