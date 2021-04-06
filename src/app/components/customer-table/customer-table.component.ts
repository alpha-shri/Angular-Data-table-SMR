import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from 'src/app/models/Customer';

import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {

  public customers: Customer[] = [];

  public hiddenEdit = false;
  public hiddenUpdate = true;
  public hiddenDelete = false;
  public hiddenClose = true;
  public emailHiddenField = false;

  EDIT_ICON_ID = "";

  ELEMENT_DATA: Customer[] = [];
  displayedColumns: string[] = ['headaccountcode', 'ouccode', 'emailAddress', 'action'];

  dataSource = new MatTableDataSource<Customer>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator; 
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: CustomerService, private toastr: ToastrService) { }

  ngOnInit() {
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllCustomers();
        
  }

  getAllCustomers(){
    this.service.fetchAllCustomerService()
                .subscribe( response => {
                    this.customers = response;
                    this.dataSource.data = response as Customer[];
                })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editAction(selectedItem: any, event: Event){

    const elementById =(event.target as Element);

    const EDIT_ID = elementById.id; 

    const EDIT_ID_ = document.getElementById("EDIT_"+selectedItem.headaccountcode);
    const CHECK_ID = document.getElementById("CHECK_"+selectedItem.headaccountcode);
    const DELETE_ID = document.getElementById("DELETE_"+selectedItem.headaccountcode);
    const CLOSE_ID = document.getElementById("CLOSE_"+selectedItem.headaccountcode);
    const EMAIL_ID = document.getElementById("EMAIL_"+selectedItem.headaccountcode+selectedItem.ouccode);
    const SEARCH_ID = document.getElementById('SEARCH_'+selectedItem.headaccountcode+selectedItem.ouccode);
    const FIELD_ID = document.getElementById('FIELD_'+selectedItem.headaccountcode+selectedItem.ouccode);
    
    console.log("EMAIL__ID: ", EMAIL_ID);
    console.log("SEARCH__ID: ", SEARCH_ID);
    console.log("FIELD_ID: ", FIELD_ID);

    EMAIL_ID.hidden = true;
    FIELD_ID.hidden = false;
    

    EDIT_ID_.hidden = true;
    DELETE_ID.hidden = true;
    CHECK_ID.hidden = false;
    CLOSE_ID.hidden = false;


  }

  closeAction(selectedItem: any, event: Event){

    const elementById =(event.target as Element);

    const EDIT_ID = elementById.id; 

    const EDIT_ID_ = document.getElementById("EDIT_"+selectedItem.headaccountcode);
    const CHECK_ID = document.getElementById("CHECK_"+selectedItem.headaccountcode);
    const DELETE_ID = document.getElementById("DELETE_"+selectedItem.headaccountcode);
    const CLOSE_ID = document.getElementById("CLOSE_"+selectedItem.headaccountcode);
    const SEARCH__ID = document.getElementById('SEARCH_'+selectedItem.headaccountcode+selectedItem.ouccode+selectedItem.emailAddress);
    const EMAIL_ID = document.getElementById("EMAIL_"+selectedItem.headaccountcode+selectedItem.ouccode);
    const SEARCH_ID = document.getElementById('SEARCH_'+selectedItem.headaccountcode+selectedItem.ouccode);
    const FIELD_ID = document.getElementById('FIELD_'+selectedItem.headaccountcode+selectedItem.ouccode);
    
    console.log("EMAIL__ID: ", EMAIL_ID);
    console.log("SEARCH__ID: ", SEARCH__ID);

    EMAIL_ID.hidden = false;
    FIELD_ID.hidden = true;

    EDIT_ID_.hidden = false;
    DELETE_ID.hidden = false;
    CHECK_ID.hidden = true;
    CLOSE_ID.hidden = true;
    
    console.log("Selected item headaccountcode: ", selectedItem.headaccountcode);
    console.log("Selected item ouccode: ", selectedItem.ouccode);
    console.log("Selected item emailAddress: ", selectedItem.emailAddress);


  }


  updateAction(selectedItem: any,event: Event){


    console.log("Selected item headaccountcode: ", selectedItem.headaccountcode);
    console.log("Selected item ouccode: ", selectedItem.ouccode);
    console.log("Selected item emailAddress: ", selectedItem.emailAddress);

    this.service.updateEmailSmrCustomerService(selectedItem.headaccountcode, selectedItem.ouccode, selectedItem.emailAddress)
        .subscribe( data => {
          this.toastr.success(data, "");
        })
    
  }
  deleteAction(selectedItem: any, event: Event){
    
    console.log("Selected item headaccountcode: ", selectedItem.headaccountcode);
    console.log("Selected item ouccode: ", selectedItem.ouccode);
    console.log("Selected item emailAddress: ", selectedItem.emailAddress);

    this.service.deleteSmrCustomerService(selectedItem.headaccountcode, selectedItem.ouccode)
        .subscribe( data => {
          this.toastr.success(data, "");
        });
    
  }

}
