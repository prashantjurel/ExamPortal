import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import swal from 'sweetalert2'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private userService: UserService, private _snackBar : MatSnackBar) { }

  public user = {
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    phoneNumber: '',

  };

  formSubmit() {
    if (this.user.username == "" || this.user.username == null) {
      /* alert("Username is required"); */
      this._snackBar.open("Username is required",'',{duration:3000});
      return;
    }
    console.log(this.user);

    //add user : userservice
    this.userService.addUser(this.user).subscribe({
      next: () => {console.log(this.user);Swal.fire("Success","User is registered","success");},
      error: (e) => {console.error(e);Swal.fire('Oops...', 'Something went wrong!', 'error')},
      complete: () => {console.info('complete');Swal.fire("Success","User is registered","success");}
    }
    )
  }

}
