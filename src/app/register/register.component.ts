import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators, FormGroup, FormControl ,FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
    form!: FormGroup;
    submitted = false;
    isResultLoaded = false;
    isUpdateFormActive = false;
    UserArray : any[] = [];
    
    currentUserID = "";
    uName: string="";
    userName : string="";
    uPassword : string="";
    roleName: string="";

  
    constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    
  ) {}

  register()
  {
  let bodyData = {
    "name" : this.uName,
    "userName" : this.userName,
    "password" : this.uPassword,
   
  };

  this.http.post("http://localhost:8080/api/users",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
  {   
   //   this.submit();
      console.log(resultData);
      alert("Registered Successfully");
    
      this.uName = '';
      this.userName = '';
      this.uPassword ='';
      
    
    });


  }

  adminRegister()
  {
  let bodyData = {
    "name" : this.uName,
    "userName" : this.userName,
    "password" : this.uPassword,
   
  };

  this.http.post("http://localhost:8080/api/admins",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
  {   
   //   this.submit();
      console.log(resultData);
      alert("Registered Successfully");
    
      this.uName = '';
      this.userName = '';
      this.uPassword ='';
      
    
    });

    
  }

  save(){
console.log("save me")
  if(this.currentUserID == '')
 
    {
      if(this.roleName =='user'){
        
        this.register();
      }
      else if(this.roleName =='admin'){
       
        this.adminRegister();
      }
     }
    else
    {
      alert('Not register');
    }  
    
  }

  ngOnInit(): void {

  
  }

  formdata:any={};

  submit(){

    //  console.log(this.formdata);
      this.save();

    }
     
 

}
