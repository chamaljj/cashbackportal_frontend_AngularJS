
import { FormGroup,  FormBuilder ,Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component ,OnInit} from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-trantype',
  templateUrl: './trantype.component.html',
  styleUrls: ['./trantype.component.css']
})
export class TrantypeComponent implements OnInit{

  tranTypeForm!:FormGroup;
  submitted = false;

  searchText: any;
  TranTypeArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  show = false;
  
  currentId ="";
  id: Number = 0;
  tranTypeId: Number=0;
  typeName: String="";

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router,public userService: UserService){
    
  this.getAllTranType();
  }
  
  getAllTranType()
  {
    
    this.http.get("http://localhost:8080/api/tranTypes")
  
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData);
        this.TranTypeArray = resultData;
    });
  }

  register()
    {
    let bodyData = {
      "id" : this.currentId,
      "tranType_id" : this.tranTypeId,
       "tranType" : this.typeName, 
     
    };

    this.http.post("http://localhost:8080/api/tranTypes",bodyData,{responseType: 'text'}).subscribe((resultData:any)=>
    {
        console.log(resultData);
        alert("Transaction Type Add Successfully..")
        this.getAllTranType();
        this.id=0;
        this.tranTypeId=0,
        this.typeName ="";
       
    });
  }
  setUpdate(data: any)
  {

    this.show = true;
    this.id = data.id;
    this.tranTypeId = data.tranTypeId;
    this.typeName = data.typeName;
    this.currentId = data.id;


  }

  UpdateRecords(id : any)
  {
    let updateBodyData = {
      "id" : this.currentId,
      "tranTypeId" : this.tranTypeId,
      "typeName" : this.typeName,
     
    };

    this.http.put("http://localhost:8080/api/tranTypes"+"/"+this.id,updateBodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Successfully Updateddd...")
       this.closepopup();
        this.getAllTranType();
        this.id=0,
        this.tranTypeId=0;
        this.typeName = "";
        
 
    });
  }
    save()
    {
    if(this.currentId == '')
      {
        this.register();
        
       }
      else
      { this.UpdateRecords(this.id);
      }  
    }

setDelete(data: any)

    {console.log("delete");
      this.http.delete("http://localhost:8080/api/tranTypes"+ "/"+ data.id,{responseType: 'text'}).subscribe((resultData: any)=>
      {
          console.log(resultData);
          alert("Transaction Type Deleted...")
          this.getAllTranType();
          this.id =0;
          this.tranTypeId = 0;
          this.typeName ="";
        
      });
   
    }
  
    ngOnInit(): void { 

       
    
     
  }
    onSubmit(){
      this.submitted=true;
    }

    formdata:any={};

    submit(){
  
      
        this.save();
  
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
