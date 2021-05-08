import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import {TimesheetsListComponent } from './components/timesheets-list/timesheets-list.component';
import {TimesheetDetailsComponent } from './components/timesheet-details/timesheet-details.component';
import {AddTimesheetComponent } from './components/add-timesheet/add-timesheet.component';
const routes: Routes = [
// { path: '', redirectTo: 'timesheets', pathMatch: 'full' },
{ path: 'timesheets', component: TimesheetsListComponent },
{ path: 'timesheets/:id', component: TimesheetDetailsComponent },
{ path: 'add', component: AddTimesheetComponent },
{path:"profile",component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
