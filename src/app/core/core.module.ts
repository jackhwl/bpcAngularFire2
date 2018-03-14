import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, PreloadAllModules } from '@angular/router';
  
  
import { NavComponent } from './nav';
import { SubNavComponent } from './subnav';

@NgModule({
    imports: [
        CommonModule, RouterModule
    ],
    exports: [
        NavComponent, SubNavComponent
    ],
    declarations: [
        NavComponent, SubNavComponent
    ],
    providers: [
    ]
})
export class CoreModule {}