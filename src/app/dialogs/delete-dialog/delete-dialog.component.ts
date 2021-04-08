import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  headaccountcode: string;
  ouccode: string;
  emailAddress: string;
  
  constructor(
    private service: CustomerService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
                  this.headaccountcode = data.headaccountcode;
                  this.ouccode = data.ouccode;
                  this.emailAddress = data.emailAddress;
                }

  ngOnInit(): void {
  }

  public deleteRecord(){
 
    this.service.deleteSmrCustomerService(this.headaccountcode, this.ouccode)
    .subscribe( data => {
      console.log(data, "");
      this._snackBar.open('Record removed successfully', "", {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-primary']
      });
      //* Refresh Table after successful update
      this.dialogRef.afterClosed()
          .subscribe( result => {
            this.service.fetchAllCustomerService();
          })

      this.dialogRef.close();
    });
    
  }

}
