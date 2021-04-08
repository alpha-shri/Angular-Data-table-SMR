import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAccountComponent } from './add-account/add-account.component'
import { ViewAccountComponent } from './view-account/view-account.component'
import { LinkSmrComponent } from './link-smr/link-smr.component'

const routes: Routes = [
  { path: '', redirectTo: 'addacc', pathMatch: 'full'},
  { path: 'addacc', component: AddAccountComponent },
  { path: 'viewacc', component: ViewAccountComponent },
  { path: 'linkacc', component: LinkSmrComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
