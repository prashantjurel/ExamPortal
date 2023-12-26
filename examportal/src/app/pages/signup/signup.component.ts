import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  public user = {
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    email:'',
    phoneNumber:'',

  };

  formSubmit() {
    if(this.user.username =="" || this.user.username == null){
      alert("Username is required");
      return;
    }
    console.log(this.user);

  }

}
