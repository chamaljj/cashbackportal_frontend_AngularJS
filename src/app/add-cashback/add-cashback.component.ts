import { Component ,OnInit} from '@angular/core';
import { FormGroup,  FormBuilder , Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-cashback',
  templateUrl: './add-cashback.component.html',
  styleUrls: ['./add-cashback.component.css']
})

export class AddCashbackComponent implements OnInit {
  minAm = 0;
  cashbackForm!:FormGroup;
  submitted = false;
  TranTypeArray : any[] =[];
  CashbackArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  
  currentId ="";
  id: number =0;
  tranType: String="";
  merchant: String="";
  customer: String="";
  minAMT: number =0;
  maxAMT: Number =0;
  rate: Number =0;
  startDate: String="";
  endDate: String="";
  count: Number=0; 
  status: String="";
  tranTypeId: Number=0;
  typeName: String="";

 

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router){
    
  this.getAllCashback();
  this.getAllTranTypes();
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
  getAllTranTypes()
  {
    
    this.http.get("http://localhost:8080/api/tranTypes")
  
    .subscribe((resultDatas: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultDatas);
        this.TranTypeArray = resultDatas;
    });
  }

  register()
    {
  
    let bodyData = {
      "id" : this.currentId,
      "tran_type" : this.tranType,
      "merchant" : this.merchant,
      "minAmt" : this.minAMT,
      "maxAmt" : this.maxAMT,
      "rate" : this.rate,
      "startDate" : this.startDate,
      "endDate" : this.endDate, 
      "count" : this.count, 
      "customer" : this.customer, 
      "status" : this.status
     
    };

    this.http.post("http://localhost:8080/api/cashbacks",bodyData,{responseType: 'text'}).subscribe((resultData:any)=>
    {
        console.log(resultData);
        alert("Cashback Add Successfully..")
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
      this.register();
     }
    else
    { }  
  }


  ngOnInit(): void {
   
   
  }


  formdata:any={};

  submit(){

    //  console.log(this.formdata);
      this.save();

    }
     
}




  
