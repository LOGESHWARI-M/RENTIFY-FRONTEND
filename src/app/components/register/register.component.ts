import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private api: APIService, private router: Router, private snackBar: MatSnackBar){

  }

  error: string = '';
  hide = true;

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl(''),
    mobile: new FormControl(null,[Validators.required]),
    type: new FormControl('seller', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  submit(){
    this.error = '';
    this.api.registerUser(this.form.value).subscribe((res)=> {
      if(res?._id){
        this.router.navigate(['login']);
        this.snackBar.open("Registered Successfully", "close", {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 3000
        });
      }else{
        this.form.reset();
        this.snackBar.open("Please try again", "close", {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 3000
        });
      }
    });
  }
}
