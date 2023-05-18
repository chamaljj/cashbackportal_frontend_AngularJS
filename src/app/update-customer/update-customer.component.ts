
import { Component,OnInit } from '@angular/core';
import { FormGroup,  FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css'],

})
export class UpdateCustomerComponent implements OnInit{
  show = false;
  view = false;
  customerForm!:FormGroup;
  submitted = false;

  p: number = 1;
  searchText : any;
  CustomerArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  currentId ="";
  id: Number = 0;
  customerId: Number = 0;
  cashbackId: Number=0;
  delFlag: String="N";
  status: String="";
  createdDate: String="";
  createdBy: String ="";
  modifiedBy: String="";
  modifiedDate:  Date = new Date();
   

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router,public userService: UserService){
    
  this.getAllCustomer();

  }
  
  
  getAllCustomer()
  {
    
    this.http.get("http://localhost:8080/api/customers")
  
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData);
        this.CustomerArray = resultData;
    });
  }

  setUpdate(data: any)
  {
    this.show = true;
    this.id = data.id;
    this.customerId = data.customerId;
    this.cashbackId = data.cashbackId;
    this.delFlag = data.delFlag;
    this.status = data.status;
    this.currentId = data.id;

  }

  UpdateRecords(id : any)
  {
    let bodyData = {
      "id" : this.currentId,
      "customerId" : this.customerId,
      "delFlag" : this.delFlag,
      "status" : this.status,
       "cashbackId" : this.cashbackId 
    
    };

    this.http.put("http://localhost:8080/api/customers"+"/"+this.id,bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Successfully Updateddd...");
        this.closepopup();
        this.getAllCustomer();
        this.id=0,
        this.customerId=0,
        this.delFlag="";
        this.status = "";
        this.cashbackId =0;
    
 
    });
  }
  save()
  {
  
  if(this.currentId == '')
    {
      
  
     }
    else
    {
      this.UpdateRecords(this.id);
      
    }  
  }
setDelete(data:any)
{
  this.http.delete("http://localhost:8080/api/customers"+ "/"+ data.id,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Successfully Deleted...");
        this.getAllCustomer();
        this.id=0,
        this.customerId=0,
        this.delFlag="";
        this.status = "";
        this.cashbackId =0;
    
 
    });
  }
  ngOnInit(): void {
    
  }

  closepopup(){
    this.show = false;
    this.view =false;
  }
  closeoverlay(e:any){
    if(e.target.classList.contains('overlay')){
      this.show = false;
      this.view = false;
    }
  }

  closeoverlayer(e:any){
    if(e.target.classList.contains('overlayer')){
      this.show = false;
      this.view = false;
    }
  }
  submit(){
  
   
      this.save();

    }

  setAuditDetails(data:any)
    {
      
        this.view = true;
        this.id = data.id;
        this.customerId = data.customerId;
        this.cashbackId = data.cashbackId;
        this.delFlag = data.delFlag;
        this.status = data.status;
        this.createdBy = data.createdBy;
        this.createdDate= data.createdDate;
        this.modifiedBy = data.modifiedBy;
        this.modifiedDate = data.modifiedDate;
        this.currentId = data.id;
    
      
    }
     
}