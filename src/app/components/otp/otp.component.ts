import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  form=new FormGroup({
    digit1:new FormControl('',[Validators.required]),
    digit2:new FormControl('',[Validators.required]),
    digit3:new FormControl('',[Validators.required]),
    digit4:new FormControl('',[Validators.required]),
    digit5:new FormControl('',[Validators.required]),
    digit6:new FormControl('',[Validators.required]),
  })
   
  otp:string|undefined

  constructor(private authService:AuthService) { }
   
  move_next(This:KeyboardEvent,curr:any,id:any,nxt:any){
    let ele=document.getElementById(id);
    if(ele!=null){
       ele.style.color='#FFF';
    }
    var invalidChars = /[^0-9]/gi
    if(invalidChars.test(curr.value))
      curr.value=""
    else
      {
        if(ele!=null){
           ele.style.color='#000';
        }
      }
    if(curr.value>="0"&&curr.value<="9"|| This.code=="ArrowRight") 
    document.getElementById(nxt)?.focus()
  }
  move_prev(This:KeyboardEvent,prev:any){
    if(This.code==="ArrowLeft"||This.code==="Backspace")
    document.getElementById(prev)?.focus()
  }
  validate(){
    this.otp=this.form.get('digit1')?.value+this.form.get('digit2')?.value+
    this.form.get('digit3')?.value+this.form.get('digit4')?.value+
    this.form.get('digit5')?.value+this.form.get('digit6')?.value
    console.log(this.otp);
 
  }
  ngOnInit(): void {
  }

}
