import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { AuthModel } from 'src/app/models/auth.model';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginFormInvalid = false;
  unauthorized: boolean;
  loading: boolean;

  constructor(
    public translate: TranslateService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  login() {
    if (this.loginForm.valid) {
      this.loading = true;
      const { email: emailLogin, password } = this.loginForm.value;
      this.authService.login({ email: emailLogin, password } as AuthModel).subscribe(
        res => {
          const { firstName, lastName, createdAt, email, _id } = res.data;
          const token = res.token;
          this.authService.loginToken({ firstName, lastName, createdAt, email, _id } as UserModel, token);
          this.loading = false;
        },
        ({ error }) => {
          console.error(error);
          if (error.error === 'Email or password are invalid') {
            this.unauthorized = true;
          }
          this.loading = false;
        }
      );
    } else {
      this.loginFormInvalid = true;
    }
  }

  validateControl(control: AbstractControl): boolean {
    return !!control?.errors && control.touched || (this.loginFormInvalid && !!control?.errors);
  }

  isValidControl(control: AbstractControl): boolean {
    return !!control?.valid && control.touched;
  }

  buildForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('admin@admin.com', [Validators.email, Validators.required]),
      password: new FormControl('123456', Validators.required)
    });
  }

}
