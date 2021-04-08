import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from 'src/app/models/Customer';

import { CustomerService } from 'src/app/services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { EditCustomerDialogComponent } from '../dialogs/edit-customer-dialog/edit-customer-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.css']
})
export class ViewAccountComponent implements OnInit {

  
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

  constructor(private service: CustomerService,
              public dialog: MatDialog) { }

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

  editOpenDialog(selectedItem: any){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      'headaccountcode': selectedItem.headaccountcode,
      'ouccode': selectedItem.ouccode,
      'emailAddress': selectedItem.emailAddress
    }

    dialogConfig.width = "60%";
    dialogConfig.height = "30%"

    this.dialog.open(EditCustomerDialogComponent, dialogConfig);
  }

  deleteAction(selectedItem: any, event: Event){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      'headaccountcode': selectedItem.headaccountcode,
      'ouccode': selectedItem.ouccode,
      'emailAddress': selectedItem.emailAddress
    }

    dialogConfig.width = "30%";

    this.dialog.open(DeleteDialogComponent, dialogConfig);
    
    
    console.log("Selected item headaccountcode: ", selectedItem.headaccountcode);
    console.log("Selected item ouccode: ", selectedItem.ouccode);
    console.log("Selected item emailAddress: ", selectedItem.emailAddress);

    
    
  }

}
