import { AuthGuardService } from './services/auth-guard.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OtpComponent } from './components/otp/otp.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [{component:LoginComponent,path:''},
                        {component:NotFoundComponent,path:'not-found-page',canActivate:[AuthGuardService]} ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
