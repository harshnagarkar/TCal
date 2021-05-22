import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddTimesheetComponent } from './components/add-timesheet/add-timesheet.component';
import { TimesheetDetailsComponent } from './components/timesheet-details/timesheet-details.component';
import { TimesheetsListComponent } from './components/timesheets-list/timesheets-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {HttpClientModule} from '@angular/common/http'; 
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AuthModule } from '@auth0/auth0-angular'; // Import the module from the SDK
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { SignupButtonComponent } from './components/signup-button/signup-button.component';
import { AuthenticationButtonComponent } from './components/authentication-button/authentication-button.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { ProfileService } from './services/profile.service';
import { environment } from '../environments/environment'


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    AddTimesheetComponent,
    TimesheetDetailsComponent,
    TimesheetsListComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    SignupButtonComponent,
    AuthenticationButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    MatDatepickerModule,
    HttpClientModule,
    MatTableModule,
    AuthModule.forRoot({ // Import the module into the application, with configuration
      domain: 'dev-5pvlocxw.us.auth0.com',
      clientId: 'EQAeTplrCHxELsZBvEVRRYU7qcWmOSil',
      audience: 'http://localhost:4200/timesheets',
      httpInterceptor: {
        allowedList: [`${environment.apiUrl}/*`],
      }
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true,
  },ProfileService],
  bootstrap: [AppComponent],
})
export class AppModule { }
