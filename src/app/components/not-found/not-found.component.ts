import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
logout(){
  this.authService.isLogged=false
  this.router.navigate([''])

}
}
