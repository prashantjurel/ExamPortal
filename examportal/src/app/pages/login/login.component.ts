import { Component } from '@angular/core';
import { AnimationDurations } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private snack: MatSnackBar, private login: LoginService) { }

  loginData = {
    username: '',
    password: '',
  };

  formSubmit() {
    console.log("login button click");
    console.log(this.loginData.username);
    console.log(this.loginData.password);


    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open("Username is required.", '', { duration: 3000 });
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open("password is required.", '', { duration: 3000 });
      return;
    }
    this.login.generateToken(this.loginData).subscribe({
      next: (data: any) => { console.log(data), console.log(data) },
      error: (e) => { console.error(e); },
      complete: () => { console.info('complete'); }
    }
    )
  }

}
