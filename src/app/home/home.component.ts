import { Component,OnInit } from '@angular/core';
import { FormGroup,  FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
 
})

export class HomeComponent implements OnInit{


  cashbackForm!:FormGroup;
  submitted = false;
  
  isResultLoaded = false;
  isUpdateFormActive = false;

  
  p: number = 1;
 
  searchText:any;
  CashbackArray : [] = [];

  currentId ="";
  id: number = 0;
  tranType: String="";
  merchant: String="";
  minAMT: Number =0;
  maxAMT: Number =0;
  rate: Number =0.0;
  startDate: String="";
  endDate: String="";
  count: Number=0;
  customer: String="";
  createdDate: String="";
  status: String=""
  response: any;


  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router){
    
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


  ngOnInit(): void {
    
  }
}
