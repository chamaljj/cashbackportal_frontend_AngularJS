import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, Validators ,FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  registerForm:any = FormGroup;
  submitted = false;



userName = new FormGroup('', [Validators.required, Validators.email]);
password = new FormGroup('', [Validators.required]);


getErrorMessage() {
  if (this.userName.hasError('required')) {
    return 'You must enter valid email';
  }

  return this.userName.hasError('email') ? 'Not a valid email' : '';
}
  getPasswordErrorMessage() {
  if (this.password.hasError('required')) {
    return 'You must enter password';
  }
}

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  get f() { return this.registerForm.controls; }

  ngOnInit(): void {    
  }

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.role);
        console.log(response.user.role);
        this.userAuthService.setToken(response.jwtToken);
        console.log(response.jwtToken);
        console.log(response.user.userName);
        const role = response.user.role[0].roleName;
      
       
          
          this.router.navigate(['/home']);
      
      },
      (error) => {
        console.log(error);
      }
    );
  }

  
  formdata:any={};

  submit(){

   

    }
     
}
