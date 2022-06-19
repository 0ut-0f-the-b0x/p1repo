import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
isLogged : boolean = false;
  constructor(private http:HttpClient) { }
  Req(req:any){
    return this.http.post('https://dev.protectt.ai/TwoFA/login',req,{responseType:'text'});
  }

}
