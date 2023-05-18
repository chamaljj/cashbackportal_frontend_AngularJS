import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-merchant',
  templateUrl: './add-merchant.component.html',
  styleUrls: ['./add-merchant.component.css']
})
export class AddMerchantComponent implements OnInit{
  merchantForm!:FormGroup;
  submitted = false;

  MerchantArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  currentId ="";
  id: Number = 0;
  mid: String = "";
  cashbackId : Number=0;
  delFlag: String="N";
  status: String="";
 


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

  register()
    {
    let bodyData = {
      "id" : this.currentId,
      "mid" : this.mid,
      "cashback_id" :  this.cashbackId ,
      "del_flag" : this.delFlag,
      "status" : this.status,
      
    };

    this.http.post("http://localhost:8080/api/merchants",bodyData,{responseType: 'text'}).subscribe((resultData:any)=>
    {
        console.log(resultData);
        alert("Merchant Add Successfully..")
        this.getAllMerchant();
        this.id=0;
        this.mid="";
        this.cashbackId = 0;
        this.delFlag="N";
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
      {
        alert("Failed Registration!!");
      }  
    }
  
    ngOnInit(): void { 

             
    this.merchantForm = this.formBuilder.group({
      customerId: [null, [Validators.required]],
      cashbackId: [null, [Validators.required]],
      status: [null, [Validators.required]],
    });
    }
    
    onSubmit(){
      this.submitted=true;
    } 

    formdata:any={};

    submit(){
  
      //  console.log(this.formdata);
        this.save();
  
      }
       

}
