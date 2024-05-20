import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  Text = "";

  constructor(private router: Router){
    const data = sessionStorage.getItem("user");
    if(data){
      this.Text = "Logout"
    }
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['login']);
    this.Text = ""
  }
}
