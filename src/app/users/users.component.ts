import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  show= false;
  UserArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  currentId ="";
  userName: String="";
  name: String="";
  password: String="";
  roleName: String="";

  

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router,public userService: UserService){
  this.getAllUsers();

  }
  
  getAllUsers()
  {
    this.http.get("http://localhost:8080/api/users")
  
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData);
        this.UserArray = resultData;
    });
  }
  setUpdate(data: any)
  {
    this.show = true;
    this.userName = data.userName;
    this.name= data.name;
    this.roleName = data.role[0].roleName;
    this.password=data.password;
    this.currentId = data.userName;

  }

  UpdateRecords(id : any)
  { 
    let bodyData = {
      "userName": this.currentId,
      "name" : this.name,
      "roleName" : this.roleName,
      "password": this.password
    
    };

    this.http.put("http://localhost:8080/api/user"+"/"+this.userName,bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Successfully Updateddd...")
        this.closepopup();
        this.getAllUsers();
        this.userName="",
        this.name="",
        this.password="";
        this.roleName=""; 
    });
  }
  save()
  {
  if(this.currentId == '')
    {
     
     }
    else
    {
      this.UpdateRecords(this.userName);
      
    }  
  }
  ngOnInit(): void {
    
  }



  closepopup(){
    this.show = false;
    
  }
  closeoverlay(e:any){
    if(e.target.classList.contains('overlay')){
      this.show = false;
    }
  }
}



