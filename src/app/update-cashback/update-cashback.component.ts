
import { UserService } from '../_services/user.service';
import { Component,OnInit } from '@angular/core';
import { FormGroup,  FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-cashback',
  templateUrl: './update-cashback.component.html',
  styleUrls: ['./update-cashback.component.css']
})

export class UpdateCashbackComponent implements OnInit{
 
  show = false;
  cashbackForm!:FormGroup;
  submitted = false;

  CashbackArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  p: number = 1;
   view = false;
  searchText:any;
  
  currentId ="";
  id: Number = 0;
  tranType: String="";
  merchant: String="";
  minAMT: Number =0;
  maxAMT: Number =0;
  rate: Number =0.0;
  startDate: String="";
  endDate: String="";
  count: Number=0;
  customer: String="";
  status: String="";
  createdDate: String="";
  createdBy: String ="";
  modifiedBy: String="";
  modifiedDate: String ="";

 

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router,public userService: UserService){
    
  this.getAllCashback();
  }
  
  getAllCashback()
  {
    
    this.http.get("http://localhost:8080/api/cashbacks")
  
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData);
        this.CashbackArray = resultData;
    });
  }

  setUpdate(data: any)
  {

    this.show = true;
    this.id = data.id;
    this.tranType = data.tranType;
    this.merchant = data.merchant;
    this.minAMT  = data.minAMT;
    this.maxAMT = data.maxAMT;
    this.rate = data.rate;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.count = data.count;
    this.customer = data.customer;
    this.status = data.status;
    this.currentId = data.id;


  }

  UpdateRecords(id : any)
  {
    let bodyData = {
      "id" : this.currentId,
      "tranType" : this.tranType,
      "merchant" : this.merchant,
      "minAMT" : this.minAMT,
      "maxAMT" : this.maxAMT,
      "rate" : this.rate,
      "startDate" : this.startDate,
      "endDate" : this.endDate, 
      "count" : this.count, 
      "customer" : this.customer, 
      "status" : this.status
    };

    this.http.put("http://localhost:8080/api/cashbacks"+"/"+this.id,bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Successfully Updateddd...")
        this.closepopup();
        this.getAllCashback();
        this.id=0,
        this.tranType = "";
        this.merchant = "";
        this.minAMT  = 0;
        this.maxAMT = 0;
        this.rate = 0;
        this.startDate = "";
        this.endDate = "";
        this.count = 0;
        this.customer = "";
        this.status = "";
 
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

setDelete(data: any)
  {
    this.http.delete("http://localhost:8080/api/cashbacks"+ "/"+ data.id,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Cashback Deleted...")
        this.getAllCashback();
        this.id =0;
        this.tranType = "";
        this.merchant = "";
        this.minAMT  = 0;
        this.maxAMT = 0;
        this.rate = 0;
        this.startDate = "";
        this.endDate = "";
        this.count = 0;
        this.customer = "";
        this.status = "";
    });
 
  }

  ngOnInit(): void {
    
  }
   

   openpopup(){
    this.show = true;
   }

  closepopup(){
    this.show = false;
    this.view=false;
  }
  closeoverlay(e:any){
    if(e.target.classList.contains('overlay')){
      this.show = false;
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
        this.tranType = data.tranType;
        this.merchant = data.merchant;
        this.status = data.status;
        this.createdBy = data.createdBy;

        //
        this.createdDate= data.createdDate;
        this.modifiedBy = data.modifiedBy;
        this.modifiedDate = data.modifiedDate;
        this.currentId = data.id;
    
      
    }
}
