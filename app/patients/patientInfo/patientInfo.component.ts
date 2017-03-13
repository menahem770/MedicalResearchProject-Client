import { MedicalInstitution } from './../../shared/medicalInstitution';
import { PatientDiagnosis, SymptomInfo } from './../../shared/patientDiagnosis';
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PatientsService } from './../../shared/services/patients.service';
import { Patient, Race, Gender } from '../../shared/patient';

@Component({
    moduleId: module.id,
    templateUrl: './patientInfo.component.html'
})
export class PatientInfoComponent {
    pageTitle: string = 'Patient Detail';
    races: string[] = Object.keys(Race).map(k => Race[k]);
    genders: string[] = Object.keys(Gender).map(k => Gender[k]);
    patient: Patient;
    errorMessage: string;
    filterQuery:string = "";
    rowsOnPage:number = 10;
    sortBy:string = "date";
    sortOrder:string = "desc";
    showDiagnosis:boolean;

    constructor(private router: Router, private patientsService: PatientsService){
        this.patientsService.changeEmitted$.subscribe(patient => {
            this.patient = patient;
            this.showDiagnosis = patient && patient.Diagnosis && patient.Diagnosis.length > 0;
            //this.addDiagnosisTemp();
        });
    }
    
    ngOnInit():void{
        if(!(this.patient && this.patient.PatientId))
            this.router.navigate(['./findPatient'])
    }

    openDetails(diagnosisNum:number):void{
        this.router.navigate(['./patientDiagnosisDetails/'+diagnosisNum]);
    }

    private addDiagnosisTemp(){
        let diag:PatientDiagnosis = new PatientDiagnosis(this.patient.PatientId);
        diag.InOutPatient = true;
        diag.DoctorId = "026606657";
        diag.InclusionDate = new Date();
        diag.DiagnosisDate = new Date();
        diag.DischargeDate = new Date();
        diag.DoctorName = "me";
        diag.General = "still healthy";
        (diag.MedicalInstitution = new MedicalInstitution()).Name = "shiba";
        diag.Symptoms.push({Key:"InclusionDate",Symptom:new Date()});
        diag.Symptoms.push({Key:"PatientCode",Symptom:this.patient.Name[0]});
        diag.Symptoms.push({Key:"Age",Symptom:new Date().getFullYear()-1986});
        diag.Symptoms.push({Key:"WaistCircumference",Symptom:110});
        diag.Symptoms.push({Key:"ConcomitantTherapy",Symptom:"not specified"});
        diag.Symptoms.push({Key:"Corticosteroids",Symptom:"yes"});
        diag.Symptoms.push({Key:"NSAID",Symptom:"no"});
        diag.Symptoms.push({Key:"Antiplatelets",Symptom:"yes"});
        diag.Symptoms.push({Key:"AntiplateletsDiscontinuedOnAnticoagulantTherapy",Symptom:false});
        diag.Symptoms.push({Key:"Psychotropics",Symptom:"not specified"});
        diag.Symptoms.push({Key:"SpecifyDrugs",Symptom:"bal bla"});
        diag.Symptoms.push({Key:"Erythropoietin",Symptom:"no"});
        diag.Symptoms.push({Key:"Statins",Symptom:"no"});
        diag.Symptoms.push({Key:"Drug",Symptom:null});
        diag.Symptoms.push({Key:"Dose/Day",Symptom:50});
        diag.Symptoms.push({Key:"Other",Symptom:"lorem ipsum kjnsdmfnbal ;kashdfgm,n  as;dgkns g;askhas bgd dfasdf"});
        this.patient.Diagnosis.push(diag);
        this.patientsService.addDiagnosis(diag).subscribe();
    }
}