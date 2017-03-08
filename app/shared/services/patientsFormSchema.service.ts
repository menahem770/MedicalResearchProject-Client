import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DynamicFormControlModel } from '@ng2-dynamic-forms/core';

import { CONFIG } from './../config';
import { MY_DYNAMIC_FORM_MODEL } from './../../patients/patientInfo/schema.model';

@Injectable()
export class PatientsFormSchemaService{
    private _url: string = CONFIG.apiUrl+"api/PatientsFormSchema";
    formModel:Array<DynamicFormControlModel>;

    constructor(private _http: Http){}

    SaveFirstSchema():Observable<any>{
        this.formModel = MY_DYNAMIC_FORM_MODEL;
        let json: string
        json = JSON.stringify(this.formModel).toString();
        let accessToken:string = JSON.parse(sessionStorage.getItem('token')).token;
        let headers: Headers = new Headers({'Authorization':'Bearer '+accessToken,'Content-Type':'application/json; charset=utf-8'});
        let options: RequestOptions = new RequestOptions({headers: headers});
        return this._http.post(this._url+"/SaveFirstSchema",json,options).map((res:Response) => res.json());
    }

    GetFirstSchema():Observable<any>{
        let accessToken:string = JSON.parse(sessionStorage.getItem('token')).token;
        let headers: Headers = new Headers({'Authorization':'Bearer '+accessToken});
        let options: RequestOptions = new RequestOptions({headers: headers});
        return this._http.get(this._url+"/GetFirstSchema",options).map((res:Response) => res.json());
    }
}