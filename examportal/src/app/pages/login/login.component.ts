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
      next: (data: any) => { this.login.loginUser(data.token); 
                             this.login.getCurrentUser().subscribe(
                              {
                                next: (user: any) => {
                                  this.login.setUser(user); 
                                  console.log(user)
                                  //Redirection for user dashboard and admin dashboard
                                  if(this.login.getUserRole()=='ADMIN'){
                                    //admin dashboard
                                    window.location.href = '/admin'
                                  }
                                  else if (this.login.getUserRole() == 'NORMAL'){
                                    //user dashboard
                                    window.location.href = '/user-dashboard'
                                  }
                                  else{
                                    this.login.logout();
                                  }

                                },
                                error: (e) => { this.snack.open("invalid details",'',{duration :3000}); console.log(e);},
                                complete: () => {console.info("complete");}
                              }
                             )},
      error: (e) => { console.error(e); },
      complete: () => { console.info('complete'); }
    }
    )
  }

}
