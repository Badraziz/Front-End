import {NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {UploadCertificateComponent} from './upload-certificate/upload-certificate.component';


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'home', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'header', component: HeaderComponent },
  {path: 'logout', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'UploadCertificate', component : UploadCertificateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
