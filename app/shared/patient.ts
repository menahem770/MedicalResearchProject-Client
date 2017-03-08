import { PatientDiagnosis } from './patientDiagnosis'
export class Patient{
    Id:string;
    PatientId:string;
    Name: string;
    DateOfBirth: Date;
    Gender: Gender;
    Race: Race;
    InclusionDate: Date;
    General: string;
    Diagnosis:PatientDiagnosis[];

    constructor(){
        this.Diagnosis = new Array<PatientDiagnosis>();
    }
    fromJSON(json:Object) {
        for (var propName in json)
            this[propName] = json[propName];
        return this;
    }
}

export enum Gender{
    Male,
    Female
}
export enum Race{
    Caucasian,
    Black,
    Latino,
    Asian,
    Other
}