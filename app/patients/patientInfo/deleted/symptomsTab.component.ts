import { Http } from '@angular/http';
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import {
    DynamicFormService,
    DynamicFormControlModel,
    DynamicFormGroupModel,
    DynamicFormArrayModel,
    DynamicInputModel
} from "@ng2-dynamic-forms/core";

import { Patient } from './../../shared/patient';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'mrp-symptoms-tab',
    moduleId:module.id,
    templateUrl:'./symptomsTab.component.html'
})
export class SymptomsTabComponent implements  OnInit {
    @Input() patient:Patient;
    @Input() formModel: DynamicFormControlModel;
    @Input() formGroup: FormGroup;
    exampleControl: FormControl;
    exampleModel: DynamicInputModel;
    arrayControl: FormArray;
    arrayModel: DynamicFormArrayModel;

    constructor(private formService: DynamicFormService) {}

    ngOnInit() {
        //let json: string = JSON.stringify(this.formModel);
        //this.formModel = this.formService.fromJSON(json);
        //this.formGroup = this.formService.createFormGroup([this.formModel]);
        
        //this.exampleControl = <FormControl> this.formGroup.get("bootstrapFormGroup1").get("bootstrapInput"); // Type assertion for having updateValue method available
        //this.exampleModel = <DynamicInputModel> this.formService.findById(
            //"bootstrapInput", (<DynamicFormGroupModel> this.formModel[0]).group);
        //this.exampleControl.valueChanges.subscribe((value: string) => console.log("example checkbox field changed to: ", value, typeof value));

        //this.arrayControl = <FormArray> this.formGroup.get("bootstrapFormGroup2").get("bootstrapFormArray");
        //this.arrayModel = <DynamicFormArrayModel> this.formService.findById(
            //"bootstrapFormArray", (<DynamicFormGroupModel> this.formModel[1]).group);
    }

    add() {
        this.formService.addFormArrayGroup(this.arrayControl, this.arrayModel);
    }

    insert(context: DynamicFormArrayModel, index: number) {
        this.formService.insertFormArrayGroup(index, this.arrayControl, context);
    }

    remove(context: DynamicFormArrayModel, index: number) {
        this.formService.removeFormArrayGroup(index, this.arrayControl, context);
    }

    move (context: DynamicFormArrayModel, index: number, step: number) {
        this.formService.moveFormArrayGroup(index, step, this.arrayControl, context);
    }

    clear() {
        this.formService.clearFormArray(this.arrayControl, this.arrayModel);
    }

    test() {
        //this.exampleModel.disabledUpdates.next(!this.exampleModel.disabled);
        //this.exampleModel.valueUpdates.next("Hello Hello");
        //console.log(JSON.stringify(this.exampleModel));
        //this.arrayModel.get(1).group[0].valueUpdates.next("This is just a test");
        //this.formService.moveFormArrayGroup(2, -1, this.arrayControl, this.arrayModel);
        this.formService.removeFormGroupControl(
            1,
            this.formGroup.get("bootstrapFormGroup1") as FormGroup,
            this.formModel[0] as DynamicFormGroupModel
        );
    }

    onBlur($event:any) {
        console.log(`BLUR event on ${$event.model.id}: `, $event);
    }

    onChange($event:any) {
        console.log(`CHANGE event on ${$event.model.id}: `, $event);
    }

    onFocus($event:any) {
        console.log(`FOCUS event on ${$event.model.id}: `, $event);
    }
}