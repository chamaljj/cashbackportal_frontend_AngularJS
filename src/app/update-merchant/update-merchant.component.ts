
import { Component,OnInit } from '@angular/core';
import { FormGroup,  FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-update-merchant',
  templateUrl: './update-merchant.component.html',
  styleUrls: ['./update-merchant.component.css']
})
export class UpdateMerchantComponent implements OnInit{

  merchantForm!:FormGroup;
  submitted = false;
  p: number = 1;
  view = false;
  searchText:any;
  MerchantArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  currentId ="";
  id: Number = 0;
  cashbackId: Number = 0;
  mid: String="";
  status: String="";
  delFlag: String="";
  createdDate: String="";
  createdBy: String ="";
  modifiedBy: String="";
  modifiedDate: String="";
   

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router,public userService: UserService){
    
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

  setUpdate(data: any)
  {
    this.show = true;
    this.id=data.id,
    this.mid = data.mid;
    this.cashbackId= data.cashbackId;
    this.delFlag = data.delFlag;
    this.status = data.status;
    this.currentId = data.id;

  }

  UpdateRecords(id : any)
  { 
    let bodyData = {
      "id": this.currentId,
      "mid" : this.mid,
      "del_flag" : this.delFlag,
      "status" : this.status,
       "cashbackId" : this.cashbackId 
    
    };

    this.http.put("http://localhost:8080/api/merchants"+"/"+this.id,bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Successfully Updateddd...")
        this.closepopup();
        this.getAllMerchant();
        this.id=0,
        this.mid="",
        this.delFlag="";
        this.status="";
        this.cashbackId=0;
    
 
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
  this.http.delete("http://localhost:8080/api/merchants"+ "/"+ data.id,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Successfully Deleted...");
        this.getAllMerchant();
        this.id=0,
        this.mid="",
        this.delFlag="";
        this.status = "";
        this.cashbackId =0;
    
 
    });
  }
  ngOnInit(): void {
    
  }

  show = false;

  closepopup(){
    this.show = false;
    this.view = false;
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
        this.mid = data.mid;
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
