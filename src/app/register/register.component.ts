import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {User} from '../user/user';
import {UserService} from '../user/user.service';
import {Authority} from '../authority/authority';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = {
     userId: 0,
    fullName: null,
    dateOfBirth: null,
    phoneNumber: null,
    email: null,
    password: null,
    nationalId: null,
    enabled: 1,
    authorityId : new Authority(1, 'ROLE_ADMIN'),
  };

  registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    dateOfBirth: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    nationalId: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
  });
  constructor(private userService: UserService,  private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log( this.registerForm);
     }
  addUser(): void {
    this.userService.addUser(this.user).subscribe(
      result => {
        this.router.navigate(['/login']);
        location.reload();
      } );
  }
}
