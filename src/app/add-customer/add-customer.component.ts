import { FormGroup,  FormBuilder ,Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component ,OnInit} from '@angular/core';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit{
  customerForm!:FormGroup;
  submitted = false;

  CustomerArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  currentId ="";
  id: Number = 0;
  customerId: Number = 0;
  delFlag:String="N";
  status: String="";
  cashbackId: Number=0;

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

  register()
    {
    let bodyData = {

      
      "id" : this.currentId,
      "customer_id" : this.customerId,
      "del_flag" : this.delFlag,
      "status" : this.status,
      "cashback_id" : this.cashbackId, 
    
    };

    this.http.post("http://localhost:8080/api/customers",bodyData,{responseType: 'text'}).subscribe((resultData:any)=>
    {
        console.log(resultData);
        alert("Customer Add Successfully..")
        this.getAllCustomer();
        this.id=0;
        this.customerId=0;
        this.delFlag="N";
        this.status = "";
        this.cashbackId =0;
       
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
      }  
    }
  
    ngOnInit(): void { 

       
    this.customerForm = this.formBuilder.group({
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
