import { Component,Input,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableModule } from "angular2-datatable";
import { Patient } from '../../shared/patient';
import { PatientDiagnosis } from '../../shared/patientDiagnosis';

@Component({
    selector: 'mrp-patient-diagnosis-list',
    moduleId:module.id,
    templateUrl:'./patientInfo.diagnosisList.component.html'
})
export class PatientInfoDiagnosisListComponent implements OnInit{
    @Input() patient:Patient;
    content:string = "advenced content here!";
    data:PatientDiagnosis[];
    filterQuery:string = "";
    rowsOnPage:number = 10;
    sortBy:string = "date";
    sortOrder:string = "desc";
    showDiagnosis:boolean;

    constructor(private router:Router){}

    ngOnInit() {
        this.data = this.patient.Diagnosis;
        this.showDiagnosis = this.patient.Diagnosis && this.patient.Diagnosis.length > 0;
    }

    openDetails(diagnosisNum:number):void{
        this.router.navigate(['./patientDiagnosisDetails/'+diagnosisNum]);
    }

    // sortByWordLength = (a: any) => {
    //     return a.city.length;
    // }

    // toInt(num: string):number {
    //     return +num;
    // }
}