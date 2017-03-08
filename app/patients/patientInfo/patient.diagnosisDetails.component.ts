import { FormArray,FormGroup,FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
    DynamicFormService,
    DynamicFormControlModel,
    DynamicFormGroupModel,
    DynamicFormArrayModel,
    DynamicInputModel
} from "@ng2-dynamic-forms/core";

import { UsersService } from './../../shared/services/users.service';
import { SymptomsTabComponent } from './symptomsTab.component';
import { PatientsFormSchemaService } from './../../shared/services/patientsFormSchema.service';
import { PatientsService } from '../../shared/services/patients.service';
import { Patient } from '../../shared/patient';
import { PatientDiagnosis } from '../../shared/patientDiagnosis';

@Component({
    selector: 'mrp-patient-diagnosis-details',
    moduleId: module.id,
    templateUrl: './patient.diagnosisDetails.component.html',
    styleUrls: ["../../../node_modules/bootstrap/dist/css/bootstrap.min.css"],
})
export class PatientDiagnosisDetailsComponent implements OnInit {
    disable: string = "";
    pageTitle: string;
    diagnosis: PatientDiagnosis;
    patient: Patient;
    formModel: Array<DynamicFormControlModel>;
    formGroup:FormGroup = new FormGroup({});
    exampleControl: FormControl;
    exampleModel: DynamicInputModel;
    arrayControl: FormArray;
    arrayModel: DynamicFormArrayModel;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private patientsService: PatientsService,
        private formsSchemaService: PatientsFormSchemaService,
        private formsService:DynamicFormService) { }
    ngOnInit(): void {
        this.patientsService.changeEmitted$.subscribe(patient => this.patient = patient)
        //this.formsSchemaService.SaveFirstSchema().subscribe(res => res);
        this.formsSchemaService.GetFirstSchema().subscribe(res => {
            this.formModel = this.formsService.fromJSON(res);
            this.formGroup = this.formsService.createFormGroup(this.formModel);
            // this.formGroup.forEach(element => {
                
            // });
        })
        this.determineFormType();

    }
    submit(): void {
        this.diagnosis.PatientId = this.patient.PatientId;
        this.patientsService.addDiagnosis(this.diagnosis);
        this.goBack();
    }
    goBack(): void {
        this.router.navigate(['./patientInfo/1']);
    }
    private determineFormType():void{
        let id = +this.route.snapshot.params['id'];
        this.patientsService.changeEmitted$.subscribe(patient => this.patient = patient);
        if (id >= 1 && this.patient.Diagnosis && this.patient.Diagnosis.length > id) {
            this.diagnosis = this.patient.Diagnosis[id];
            this.pageTitle = 'Edit Diagnosis for ' + this.patient.Name;
            this.disable = 'disabled';
        }
        else {
            this.diagnosis = new PatientDiagnosis(this.patient.PatientId);
            this.diagnosis.PatientId = this.patient.PatientId;
            this.patient.Diagnosis.push(this.diagnosis);
            this.pageTitle = 'new Diagnosis for ' + this.patient.Name;
        }
    }





    add() {
        this.formsService.addFormArrayGroup(this.arrayControl, this.arrayModel);
    }

    insert(context: DynamicFormArrayModel, index: number) {
        this.formsService.insertFormArrayGroup(index, this.arrayControl, context);
    }

    remove(context: DynamicFormArrayModel, index: number) {
        this.formsService.removeFormArrayGroup(index, this.arrayControl, context);
    }

    move (context: DynamicFormArrayModel, index: number, step: number) {
        this.formsService.moveFormArrayGroup(index, step, this.arrayControl, context);
    }

    clear() {
        this.formsService.clearFormArray(this.arrayControl, this.arrayModel);
    }

    test() {
        //this.exampleModel.disabledUpdates.next(!this.exampleModel.disabled);
        //this.exampleModel.valueUpdates.next("Hello Hello");
        //console.log(JSON.stringify(this.exampleModel));
        //this.arrayModel.get(1).group[0].valueUpdates.next("This is just a test");
        //this.formsService.moveFormArrayGroup(2, -1, this.arrayControl, this.arrayModel);
        this.formsService.removeFormGroupControl(
            1,
            this.formGroup.get("bootstrapFormGroup1") as FormGroup,
            this.formModel[0] as DynamicFormGroupModel
        );
    }

    // onBlur($event:any) {
    //     console.log(`BLUR event on ${$event.model.id}: `, $event);
    // }

    onChange($event:any) {
        console.log(`CHANGE event on ${$event.model.id}: `, $event);
    }

    // onFocus($event:any) {
    //     console.log(`FOCUS event on ${$event.model.id}: `, $event);
    // }
}