import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from '@pages/login-page/login-page.component';
import {UserComponentsModule} from '@components/user-components/user-components.module';

const router: Routes = [{
  path: '', component: LoginPageComponent, data: {
    title: 'Login Page!'
  }
}];

@NgModule({
  imports: [
    CommonModule,
    UserComponentsModule,
    RouterModule.forChild(router),
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    LoginPageComponent
  ]
})
export class LoginPageModule { }
