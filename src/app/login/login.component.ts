import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authService.logout();

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get form() {
    return this.loginForm.controls;
  }

  handleLogin() {
    this.authService.login(this.form.email.value, this.form.password.value).subscribe(
      result => {
        this.router.navigate(['/profile']);
      }, error => {
        console.log(error);
        this.error = error;
      }
    );
  }
}
