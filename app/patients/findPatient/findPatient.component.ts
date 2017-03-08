import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

import { UsersService } from './../../shared/services/users.service';
import { Patient } from './../../shared/patient';
import { User } from './../../shared/user';
import { PatientsService } from '../../shared/services/patients.service';
import { FindPatientModel } from './findPatientModel';

@Component({
    moduleId:module.id,
    templateUrl:'./findPatient.component.html'
})
export class FindPatientComponent{
    patient:FindPatientModel = new FindPatientModel();
    loggedInUser:User;
    pageTitle:string = "Find Patient";
    error:string;
    
    constructor(private patientsService:PatientsService, private router:Router,private dataService:UsersService){
        this.dataService.changeEmitted$.subscribe(user => this.loggedInUser = <User>user);
        this.patient.PatientId = '026606657';
    }

    find():void{
        this.patientsService.getPatients(this.patient)
            .subscribe(response => {
                let patient = new Patient().fromJSON(response[0]);
                this.patientsService.emitChange(patient);
                this.router.navigate(['./'+this.navigationAddress(patient)]);
            });
    }
    
    private navigationAddress(patients:Patient):string{
        if(patients)
            return 'patientInfo';
        else
            this.error = "no patients found!";
    }
}