
import { Component,OnInit } from '@angular/core';
import { FormGroup,  FormBuilder } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

@Injectable()
export class ProfileComponent implements OnInit{


  UserArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  currentId ="";
  userName: String="";
  name: String="";
  password: String="";
  roleName: String="";

  

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router,public userService: UserService,private userAuthService: UserAuthService,){
    this.getAllUser();
  }
  
  getAllUser()

  {
    const userRoles: any = this.userAuthService.getRoles();
   
    console.log("user me");
    this.http.get("http://localhost:8080/api/user"+"/"+this.userName)
  
    .subscribe((resultData: any)=>
    {
      this.isResultLoaded = true;
        console.log(resultData);
        this.UserArray = resultData;
        
    });
  }

  ngOnInit(): void {
   
}


}
