import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { OtpComponent } from './components/otp/otp.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OtpComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
