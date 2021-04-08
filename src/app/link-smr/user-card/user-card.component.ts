import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  xidinput = '';
  username = '';
  companyname = '';
  headaccountcode = '';
    

  showXIDCard = false;
  xidalert = false;
  hacalert = false;
  linkXIDbtn = false;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  lookUpXID(){
    console.log("Inside lookUpXID");
    
    this.companyname = "Rivus Fleet Solutions";
    this.username = "Shrijeet Kumar Panda"
    if(this.xidinput != ""){
      this.xidalert = false
      this.showXIDCard = true
      this.xidinput = '';
      this._snackBar.open('XID User found', "", {
        duration: 4000,
        panelClass: ['mat-toolbar', 'mat-primary']
      });


    }else{
      
        this.xidalert = true
    }
  }

  public resetXID(){
    this.xidinput = '';
    this.xidalert = false
    this.showXIDCard = false;
  }


 

  lookUpHAC(){
    console.log("Inside lookUpHAC");
    if(this.headaccountcode != ""){
      console.log(this.headaccountcode);
      
      this.hacalert = false;
      this.linkXIDbtn = true;

      this._snackBar.open('Head account code validated and found', '', {
        duration: 4000,
        panelClass: ['mat-toolbar', 'mat-primary']
      });
      
    }else{
      console.log("inside else");
      
        this.hacalert = true
    }
  }

  public resetHAC(){
    this.headaccountcode = '';
    this.hacalert = false;
    this.linkXIDbtn = false;
  }

}
