import { Component,OnInit } from '@angular/core';
import { FormGroup,  FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})

export class ViewCustomerComponent implements OnInit{

  customerForm!:FormGroup;
  submitted = false;

  p: number = 1;
 
  searchText:any;
  CustomerArray : [] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  currentId ="";
  customerId: Number = 0;
  cashbackId: Number=0;
  createdDate: String="";
  createdBy: String ="";
  modifiedBy: String="";
  modifiedDate: String="";
  delFlag: String="";
  status: String="";
   
  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router){
    
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
  ngOnInit(): void {
    
  }
}