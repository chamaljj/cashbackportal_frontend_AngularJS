import { Component,OnInit } from '@angular/core';
import { FormGroup,  FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-merchant',
  templateUrl: './view-merchant.component.html',
  styleUrls: ['./view-merchant.component.css']
})
export class ViewMerchantComponent {

  searchText:any;
  p: number = 1;
  merchantForm!:FormGroup;
  submitted = false;

  MerchantArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  currentId ="";
  id: Number = 0;
  mid: String="";
  status: String="";
  createdDate: String="";
  createdBy: String ="";
  modifiedBy: String="";
  modifiedDate: String="";

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router){
    
  this.getAllMerchant();
  }
  
  getAllMerchant()
  {
    
    this.http.get("http://localhost:8080/api/merchants")
  
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData);
        this.MerchantArray = resultData;
    });
  }
  ngOnInit(): void {
    
  }

}
