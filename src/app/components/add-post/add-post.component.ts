import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit{

  form: FormGroup;
  isUpdate = false;
  updateId = '';

  constructor(private router: Router, private api: APIService){
    const login = sessionStorage.getItem("isLogin");
    if(!login){
      router.navigate(['/login']);
    }
    
    this.form = new FormGroup({
      p_name: new FormControl('', [Validators.required]),
      place: new FormControl('', [Validators.required]),
      area: new FormControl('', [Validators.required]),
      nor: new FormControl(null, [Validators.required]),
      nob: new FormControl(null, [Validators.required]),
      h_nearby: new FormControl('', [Validators.required]),
      c_nearby: new FormControl('', [Validators.required]),
      o_name: new FormControl('', [Validators.required]),
      contact: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    const data = sessionStorage.getItem('postData');
    if(data){
      const parsedData = JSON.parse(data);
      this.updateId = parsedData._id;
      this.isUpdate = true;
      this.form.setValue({
        p_name: parsedData.p_name,
        place: parsedData.place,
        area: parsedData.area,
        nor: parsedData.nor,
        nob: parsedData.nob,
        h_nearby: parsedData.h_nearby,
        c_nearby: parsedData.c_nearby,
        o_name: parsedData.o_name,
        contact: parsedData.contact
      });
    }
  }
  
  submit(){
    const user = sessionStorage.getItem("user") || '';
    const parsedUser = JSON.parse(user);
    if(this.isUpdate){
      this.api.updatePostById(this.updateId, this.form.value).subscribe((res)=> {
        if(res){
          sessionStorage.removeItem('postData');
          this.router.navigate(['']);
        }
      })
    }else {
      this.api.addPost({...this.form.value, posted_by: parsedUser._id}).subscribe((res)=> {
        if(res){
          this.router.navigate([''])
        }
      },
    (err)=> {
      console.log(err)
    })
    }
  }
}
