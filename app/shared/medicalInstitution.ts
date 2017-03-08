export class MedicalInstitution{
    Id:string;
    Name:string;

    fromJSON(json:Object) {
        for (var propName in json)
            this[propName] = json[propName];
        return this;
    }
}