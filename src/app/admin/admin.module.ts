import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';

import { AdminComponent } from './adminComponent/admin.component';
import { AdminMenuComponent } from './adminMenu/admin-menu.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signUp/sign-up.component';

import { UserService, AuthGuard, AuthService } from '../core/services';
import { MenuAdminService } from './adminShared/menu-admin.service';

import { MenuAdminComponent } from './menuAdmin/menu-admin.component';
import { MenuAddComponent } from './menuAdd/menu-add.component';
import { MenuEditComponent } from './menuEdit/menu-edit.component';
import { SubMenuAdminComponent } from './subMenuAdmin/sub-menu-admin.component';

import { TruncatePipe } from './adminShared/trunc.pipe';




const AdminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent, 
        children: [
            { path: 'menu-admin', component: MenuAdminComponent, canActivate: [AuthGuard] },
            { path: 'sub-menu-admin', component: SubMenuAdminComponent, canActivate: [AuthGuard] },
            { path: 'menu-edit/:sub', component: MenuEditComponent, canActivate: [AuthGuard] },
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignUpComponent },
            { path: 'menu/:id', component:　MenuEditComponent, canActivate: [AuthGuard] },
            { path: '', component: AdminMenuComponent, canActivate: [AuthGuard] }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        QuillModule,
        RouterModule.forChild(AdminRoutes)
    ],
    exports: [
        RouterModule,
        TruncatePipe
    ],
    declarations: [
        AdminComponent,
        AdminMenuComponent,
        LoginComponent,
        SignUpComponent,
        MenuAdminComponent,
        MenuAddComponent,
        MenuEditComponent,
        SubMenuAdminComponent,
        TruncatePipe
    ],
    providers: [
        UserService,
        MenuAdminService,
        AuthGuard,
        AuthService
    ]
})
export class AdminModule {}
