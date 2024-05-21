import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(private api: APIService, private router: Router, private snackBar: MatSnackBar) {

  }

  hide = true;

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  submit() {
    this.api.loginUser(this.form.value).subscribe(
      (res) => {
        if (res?._id) {
          sessionStorage.setItem("user", JSON.stringify(res));
          this.router.navigate(['']);
          sessionStorage.setItem('isLogin', "yes");
        }
      },
      (error) => {
        this.snackBar.open(`Invalid email or password`, "close", {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 3000
        });
      }
    );
  }
}
