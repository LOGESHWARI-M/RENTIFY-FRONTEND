import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  isSeller = true;
  userData: any = {};
  userId = '';

  constructor(private router: Router){
    
  }

  ngOnInit(): void {
    const who = sessionStorage.getItem('user');
    if (who) {
      const parsedWho = JSON.parse(who);
      this.userData = parsedWho;
      if (parsedWho.type === 'seller') {
        this.isSeller = true;
      } else {
        this.isSeller = false;
      }
    }
  }

  addPost(){
    this.router.navigate(['add-post']);
  }

}
