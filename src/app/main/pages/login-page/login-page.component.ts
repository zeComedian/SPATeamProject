import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppFormService} from '@shared/services/app-form.service';
import {AuthService} from '@shared/auth/auth.service';
import {CustomValidators} from '@shared/services/custom-validators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public LoginForm: FormGroup;
  private storCheckBox: string = 'saveData';
  navLinks = [
    {path: '/login',  label: 'Sign In', class: 'active'},
    {path: '/registration',  label: 'Sign Up', class: 'active'},
  ];

  public formErrors = {
    l_login: '', l_password: '', l_save: ''
  };

  constructor(
    private formBuild: FormBuilder,
    private formService: AppFormService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    let savedCheckBox: boolean = localStorage.getItem(this.storCheckBox) === 'true' || false;
    let savedLogin = savedCheckBox? 'Your Login' : '';
    let savedPassword = savedCheckBox? 'Your Password' : '';

    this.LoginForm = this.formBuild.group({
      l_login:    [savedLogin, [Validators.required,
        CustomValidators.validateLimits(5,20),
        CustomValidators.validateCharacters()]],
      l_password: [savedPassword, [Validators.required,
        CustomValidators.validateLimits(8,20), ]],
      l_save:     [savedCheckBox, [Validators.required]],
    });
  }

  onLogin(){
    if (this.LoginForm.valid){
      let login: string = this.LoginForm.value['l_login'],
          password: string = this.LoginForm.value['l_password'],
          checkBox = this.LoginForm.value['l_save'];

      this.authService.onLogin(login, password, checkBox);
      this.LoginForm.reset();
    } else {
      this.formErrors = this.formService.validateForm(this.LoginForm, this.formErrors, false);
    }
  }

}
