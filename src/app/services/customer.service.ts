import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from '../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private BASE_URL = "http://localhost:8080/smrportal"



  customerData: Customer[] = [
    {
      headaccountcode: "BP1234",
      ouccode: "BP6221",
      emailAddress: "shrijeet.panda@rivusfleetsolutions.com, arko.pal@rivusfleetsolutions.com, sagnik.mukherjee@rivusfleetsolutions.com"
    },
    {
      headaccountcode: "QW1317",
      ouccode: "ER8922",
      emailAddress: "sagnik.mukherjee@rivusfleetsolutions.com"
    },
    {
      headaccountcode: "ON9921",
      ouccode: "DF0023",
      emailAddress: "arko.pal@rivusfleetsolutions.com"
    },
    {
      headaccountcode: "XM9921",
      ouccode: "LP0023",
      emailAddress: "arko.pal@rivusfleetsolutions.com"
    },
    {
      headaccountcode: "RT1234",
      ouccode: "UI6221",
      emailAddress: "shrijeet.panda@rivusfleetsolutions.com"
    },
    {
      headaccountcode: "YU1317",
      ouccode: "YN8922",
      emailAddress: "sagnik.mukherjee@rivusfleetsolutions.com"
    },
    {
      headaccountcode: "JS1223",
      ouccode: "MN0023",
      emailAddress: "arko.pal@rivusfleetsolutions.com"
    },
    {
      headaccountcode: "MN9921",
      ouccode: "HS2721",
      emailAddress: "arko.pal@rivusfleetsolutions.com"
    },
    {
      headaccountcode: "LG1234",
      ouccode: "BP6221",
      emailAddress: "shrijeet.panda@rivusfleetsolutions.com"
    },
    {
      headaccountcode: "MN9921",
      ouccode: "SD0023",
      emailAddress: "arko.pal@rivusfleetsolutions.com"
    }
  ];


  constructor(private http: HttpClient) { }


  public fetchAllCustomerService(){

      let response = this.http.get(`this.BASE_URL/getalldmscustomers`);

      const observer = of(this.customerData);
      return observer;

  }


  public addSmrCustomerService(data){

    let _urlCustomer = `${this.BASE_URL}/addsmrcustomer/${data.headaccountcodecode}/${data.emailAddress}/${data.ouccode}`;
    console.log("URL _urlCustomer: ", _urlCustomer);
    
    let response = this.http.post(_urlCustomer,{});
    return of("Customer added successfully");

  }

  public updateEmailSmrCustomerService(headaccountcodecode, ouccodecode, emailAddress){
    let formatted_url = `${this.BASE_URL}/updateemail/${headaccountcodecode}/${emailAddress}/${ouccodecode}`;
    console.log("Inside updateEmailSmrCustomer: " + formatted_url);
    let response = this.http.post(formatted_url, {});

    return of("Customer email updated successfully");
  }

  public deleteSmrCustomerService(headaccountcodecode, ouccodecode){
    let formatted_url = `${this.BASE_URL}/deletesmrcustomer/${headaccountcodecode}/${ouccodecode}`;
    console.log("Inside deleteSmrCustomer: " + formatted_url);
    let response = this.http.post(formatted_url, {});
    return of("Customer removed successfully");
  }

  

  
}
