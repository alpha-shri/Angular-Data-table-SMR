import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-edit-customer-dialog',
  templateUrl: './edit-customer-dialog.component.html',
  styleUrls: ['./edit-customer-dialog.component.css'],
})
export class EditCustomerDialogComponent implements OnInit {
  headaccountcode: string;
  ouccode: string;
  emailAddress: string;

  constructor(
    private service: CustomerService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
                  this.headaccountcode = data.headaccountcode;
                  this.ouccode = data.ouccode;
                  this.emailAddress = data.emailAddress;
                }

  ngOnInit(): void {}

  public updateEmail() {
    console.log(this.headaccountcode);
    console.log(this.ouccode);
    console.log(this.emailAddress);

    this.service.updateEmailSmrCustomerService(
        this.headaccountcode,
        this.ouccode,
        this.emailAddress
      )
      .subscribe((data) => {
        console.log(data);
        this._snackBar.open('Customer email address updated successfullly', "", {
          duration: 4000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
//* Refresh Table after successful update
        this.dialogRef.afterClosed().subscribe( result => {
          this.service.fetchAllCustomerService();
        })

        this.dialogRef.close();
      });
  }
}
