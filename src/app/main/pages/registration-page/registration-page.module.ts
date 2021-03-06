import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationPageComponent} from '@registration/registration-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {AppFormService} from '@shared/services/app-form.service';
import {ActionsComponentsModule} from '@components/actions-components/actions-components.module';

const router: Routes = [{
  path: '', component: RegistrationPageComponent, data: {
    title: 'Registration Page!'
  }
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ActionsComponentsModule,

    MatInputModule,
    RouterModule.forChild(router),
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    RegistrationPageComponent
  ],
  providers: [
    AppFormService
  ]
})
export class RegistrationPageModule { }
