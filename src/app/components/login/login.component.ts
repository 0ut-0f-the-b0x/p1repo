import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  isLogged=false
  cv:boolean|undefined
  res:any
  msg:any
  isHidden:boolean=true
  isQRHidden:boolean=false
  sendFlag:string=""
  constructor(private router:Router,private authService:AuthService) { 
  }

  form=new FormGroup({
      username:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
      otp:new FormControl(''),
      register:new FormControl(''),
      reset:new FormControl('')})

  
  public get username() : AbstractControl | null {
    return this.form.get('username');
  }
  
  public get password() : AbstractControl | null {
    return this.form.get('password');
  }

  public get registerFlag() : AbstractControl | null{
    return this.form.get('register');
  }

  public get resetFlag() : AbstractControl | null { 
    return this.form.get('reset');
  }

isFlagsValid(){
 return  (this.registerFlag?.value || this.resetFlag?.value )?false:true
}
  public get otp() : AbstractControl | null{
    return this.form.get('otp');
  }
  toggle(hid:any){
    console.log(hid);
    
    this.isHidden=!this.isHidden
    if(!this.isHidden) //isHidden is false
      hid.textContent="New User ?" 
    else
      hid.textContent="Existing User !"
  }

  createObject(usr:string,pwd:string,value:string,rr:number){
    if(rr==0)
     return {"username":usr,"password":pwd,"rrFlag":value}
    else
     return {"username":usr,"password":pwd,"otp":value}
  }
  submit=()=>{
    console.log(this.registerFlag);
    console.log("form valid checking (true=>valid , false=>invalid)",this.form.valid);
      if(this.form.valid){

        if(this.otp?.value){
          let obj=this.createObject(this.username?.value,this.password?.value,this.otp.value,1);
          console.log('otp api request =>',obj);
          this.res?this.res.unsubscribe():null
          this.res=this.authService.Req(obj).subscribe(res=>this.msg=res)
          setTimeout(() => {
            console.log(this.msg);
            if(this.msg==='true'){
              this.authService.isLogged=true
              this.router.navigate(['not-found-page'])
            }
            else{
              alert('otp entered is either invalid or expired\ntry again')
            }
          }, 300);
        }
        else{
        let regf=this.registerFlag?.value
        let resf=this.resetFlag?.value
        if(regf==true)
          this.sendFlag="true"
        if(regf==false)
          this.sendFlag="false"
        console.log("register checkbox value => ",regf);
        console.log("reset checkbox value => ",resf);
        let obj=this.createObject(this.username?.value,this.password?.value,this.sendFlag,0)
        this.res?this.res.unsubscribe():null
        this.res=this.authService.Req(obj).pipe(
          catchError(
            (err : Error)=>{
              console.error(err)
            return throwError(()=>new Error(''))
            }
            ))
            .subscribe({
           next : (response)=>{   
            this.msg=response
            console.log("response string from server : ",this.msg);
            
          },
          error : (err:Error)=>{
            console.log(err);         
          }
        }
        )
      setTimeout(() => {
        if(this.msg==='Already registered'){
          this.isHidden=false
          let hidden_tag:any
          document.getElementById('hid')?hidden_tag=document.getElementById('hid'):hidden_tag=null
          if(hidden_tag)
            hidden_tag.innerHTML="New User ?"
        }
        else if(this.msg==='Already reset'){
          alert('contact your organization to reset 2FA')
        }
        else{
          this.isQRHidden=true
        }
      },300);
       
      }
        
       }
  }
  
  ngOnInit(): void {
    this.authService.isLogged=false
  }
  ngOnDestroy(): void {
  this.res.unsubscribe()
}
}
