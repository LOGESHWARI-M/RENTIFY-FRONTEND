import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private apiUrl = 'https://rentify-lovat.vercel.app/';

  constructor(private http: HttpClient) { }

  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}users/register`, data);
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}users/login`, credentials);
  }

  addPost(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}posts/add`, data);
  }

  getPosts(): Observable<any>{
    return this.http.get(`${this.apiUrl}posts`);
  }

  getPostsById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}posts/${id}`);
  }

  deletePostById(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}posts/${id}`);
  }

  updatePostById(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}post/update/${id}`, data);
  }
}
