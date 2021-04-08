import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/Customer';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
  
  value = 'Clear me';

  
  constructor(
    private service: CustomerService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
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
          this._snackBar.open('Customer onboarding successful', "", {
            duration: 4000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
          this.customerForm.reset();
          this.service.fetchAllCustomerService();
        });

    //? Access the particular value
    //* this.customerForm.get['headaccountcode'].value;
  }

  public refreshDataTable(){
      this.service.fetchAllCustomerService();
  }

}
