import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  hidePassword = true;

  userLoginForm = new FormGroup({
    password: new FormControl(''),
    email: new FormControl('', [Validators.email])
  }, [Validators.required, Validators.maxLength(255)]);

  constructor(public userService: UserService, private router: Router) {
  }

   // 200 ok en on error
    // snackbar wachtwoord verkeerd
  onLogin() {
    this.userService.login(this.userLoginForm.value).subscribe(res => {
      this.handleLoginResponse(res);
    });
  }

  handleLoginResponse(response) {
    const jwtToken = response.jwtToken;
    console.log(jwtToken);
    localStorage.setItem('jwtToken', jwtToken);
    this.router.navigate(['/home']);
  }
}
