import { MedicalInstitution } from './medicalInstitution';
export class PatientDiagnosis{
    Id:string;
    PatientId: string;
    DoctorId: string;
    DoctorName: string;
    MedicalInstitution: MedicalInstitution;
    InOutPatient: boolean;
    DiagnosisDate: Date;
    DischargeDate: Date;
    InclusionDate: Date;
    General: string;
    Symptoms: {Key:string,Symptom:SymptomInfo}[];

    constructor(patientId:string){
        this.PatientId = patientId;
        this.Symptoms = new Array();
    }
    fromJSON(json:Object) {
        for (var propName in json)
            this[propName] = json[propName];
        return this;
    }
}

export class SymptomInfo{
    SymptomName:string;
    BoolValue:boolean;
    StringValue:string;
    NumberValue:number;
    DateValue:Date;

    constructor(name:string,bool:boolean,str:string,num:number,date:Date){
        this.SymptomName = name;
        if(bool) this.BoolValue = bool;
        if(str) this.StringValue = str;
        if(num) this.NumberValue = num;
        if(date) this.DateValue = date;
    }

    fromJSON(json:Object) {
        for (var propName in json)
            this[propName] = json[propName];
        return this;
    }
}
