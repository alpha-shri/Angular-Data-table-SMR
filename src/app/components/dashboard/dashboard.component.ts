import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/Customer';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // headaccountcode = "";
  // ouccode = "";
  // emailAddress = "";

  constructor(
    private service: CustomerService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  customerForm = this.fb.group({
    headaccountcode: ['', [Validators.required]],
    ouccode: ['', Validators.required],
    emailAddress: ['', [Validators.required, Validators.email]],
  });

  get headaccountcode() {
    return this.customerForm.get('headaccountcode');
  }
  get ouccode() {
    return this.customerForm.get('ouccode');
  }
  get emailAddress() {
    return this.customerForm.get('emailAddress');
  }

  ngOnInit(): void {}
  public formSubmit() {
    console.log(this.customerForm.value);

    this.service.addSmrCustomerService(this.customerForm.value)
        .subscribe( data => {
          
          this.service.fetchAllCustomerService();
          this.toastr.success("",data);
        });

    //? Access the particular value
    //* this.customerForm.get['headaccountcode'].value;
  }

  public refreshDataTable(){
      this.service.fetchAllCustomerService();
  }

}
