import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

import { Patient } from '../../shared/models/patient';
import { User } from '../../shared/models/user';
import { PatientsService } from '../../shared/services/patients.service';
import { FindPatientModel } from './findPatientModel';

@Component({
    moduleId:module.id,
    templateUrl:'./findPatient.component.html',
    styleUrls:['./findPatient.component.css']
})
export class FindPatientComponent{
    patient:FindPatientModel = new FindPatientModel();
    loggedInUser:User;
    pageTitle:string = "Find Patient";
    error:string;
    
    constructor(private patientsService:PatientsService, private router:Router){
        this.patient.PatientId = '026606657';
    }

    find():void{
        this.patientsService.getPatients(this.patient)
            .subscribe(response => {
                if(response[0]){
                    let patient = new Patient().fromJSON(response[0]);
                    this.patientsService.emitChange(patient);
                    this.router.navigate(['./'+this.navigationAddress(patient)]);
                }
            },error => {
                console.log(error);
                this.error = "server error!"
            } );
    }
    
    private navigationAddress(patients:Patient):string{
        if(patients)
            return 'patientInfo';
        else
            this.error = "no patients found!";
    }
}