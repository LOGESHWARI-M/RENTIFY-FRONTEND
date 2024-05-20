import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{

  @Input() isSeller: boolean = false;
  @Input() user: any;

  isThumbUpClicked: boolean = false;
  properties: any = []
  likedPropertyId: number | null = null;

  constructor(private api: APIService, private router: Router){

  }


  onThumbUpClick(propertyId: any): void {
    if (this.likedPropertyId === propertyId) {
      this.likedPropertyId = null;
    } else {
      this.likedPropertyId = propertyId;
    }
  }

  getPosts(){
    if(this.isSeller){
      this.api.getPostsById(this.user?._id).subscribe((res)=> {
        if(res){
          this.properties = res;
        }
      },
      (err)=> {
        console.log(err)
      }
    )
    }else{
      this.api.getPosts().subscribe((res)=> {
        if(res){
          this.properties = res;
        }
      },
      (err)=> {
        console.log(err)
      }
    )};
  }
  ngOnInit(): void {
    this.getPosts();
  }

  deletePost(id: string){
    this.api.deletePostById(id).subscribe((res)=> {
      if(res){
        this.getPosts();
      }
    })
  }

  updatePost(data: any){
    sessionStorage.setItem("postData", JSON.stringify(data));
    this.router.navigate(['add-post']);
  }
}
