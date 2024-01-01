import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


  constructor(

    private http:HttpClient
    
  ) { }

  //add user
  public addUser(user:any){
    console.log("inside add user");
    
    return this.http.post("http://localhost:8080/user",user,this._options);

  }

}
