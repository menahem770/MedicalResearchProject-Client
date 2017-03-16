import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, CanActivate } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { DataTableModule } from 'angular2-datatable';
import { DynamicFormsCoreModule } from "@ng2-dynamic-forms/core";
import { DynamicFormsBootstrapUIModule } from "@ng2-dynamic-forms/ui-bootstrap";

import { AppComponent }  from './app.component';
import { MainAppComponent } from './mainApp/mainApp.component';
import { LoginRegisterComponent } from './loginRegistration/loginRegister.component';
import { LogoutComponent } from './loginRegistration/logout.component';
import { EnumToOptionsFilter } from './shared/components/enumToOptionsFilter.pipe';
import { EqualValidator } from './loginRegistration/shared/equalValidator.directive';
import { PatientInfoComponent } from './patients/patientInfo/patientInfo.component';
import { PatientEditInfoComponent } from './patients/patientInfo/patientInfoEdit.component';
import { TabComponent } from './shared/components/tabs/tab.component';
import { TabsComponent } from './shared/components/tabs/tabs.component';
import { PatientDiagnosisDetailsComponent } from './patients/patientInfo/patient.diagnosisDetails.component';
import { FindPatientComponent } from './patients/findPatient/findPatient.component';
import { CanActivateOAuthGuard } from './shared/services/canActivateOAuthGuard';
import { DataFilterPipe } from './shared/components/dataFilter.pipe';
import { CanDeactivateDiagnosisFormGuard } from "./shared/services/canDeactivateFormEditGuard";


@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  HttpModule,
                  DataTableModule,
                  MaterialModule.forRoot(),
                  ReactiveFormsModule,
                  DynamicFormsCoreModule.forRoot(),
                  DynamicFormsBootstrapUIModule,
                  RouterModule.forRoot([
                    {path: 'login', component: LoginRegisterComponent},
                    {path: 'login/:form', component: LoginRegisterComponent},
                    {path: 'register', redirectTo: 'login/1', pathMatch:'full'},
                    {path: 'passwordrecovery', redirectTo: 'login/2', pathMatch:'full'},
                    {path: 'logout/:id', component: LogoutComponent},
                    {path: 'patientInfo', component: PatientInfoComponent, canActivate : [CanActivateOAuthGuard]},
                    {path: 'patientEdit/:id', component: PatientEditInfoComponent, canActivate : [CanActivateOAuthGuard]},
                    {path: 'patientDiagnosisDetails/:id',component:PatientDiagnosisDetailsComponent,canActivate:[CanActivateOAuthGuard],canDeactivate:[CanDeactivateDiagnosisFormGuard]},
                    {path: 'findPatient', component: FindPatientComponent, canActivate : [CanActivateOAuthGuard]},
                    // {path: 'userManagment', component: UnderConstructionComponent, canActivate : [CanActivateOAuthGuard]},
                    // {path: 'research', component: UnderConstructionComponent, canActivate : [CanActivateOAuthGuard]},
                    // {path: 'personalInfo', component: UnderConstructionComponent, canActivate : [CanActivateOAuthGuard]},
                    // {path: '', redirectTo: 'findPatient', pathMatch:'full', canActivate : [CanActivateOAuthGuard]},
                    // {path: '**', redirectTo: 'findPatient', pathMatch:'full', canActivate : [CanActivateOAuthGuard]},
                    {path: '', redirectTo: 'login', pathMatch:'full'},
                    {path: '**', redirectTo: 'login', pathMatch:'full'}
                  ])
                ],
  declarations: [ AppComponent,
                  MainAppComponent,
                  LoginRegisterComponent,
                  LogoutComponent,
                  EqualValidator,
                  PatientInfoComponent,
                  PatientEditInfoComponent,
                  PatientDiagnosisDetailsComponent,
                  FindPatientComponent,
                  TabComponent,
                  TabsComponent,
                  EnumToOptionsFilter,
                  DataFilterPipe
                ],
  providers:    [CanActivateOAuthGuard,CanDeactivateDiagnosisFormGuard],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
