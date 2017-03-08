import { Response } from '@angular/http';
import { Component,Input,Output,EventEmitter } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import { RegistrationInfo } from './shared/registrationInfo';
import { LoginInfo } from './shared/loginInfo';
import { RecoveryInfo } from './shared/recoveryInfo';
import { UsersService } from '../shared/services/users.service';
import { User } from './../shared/user';

@Component({
    selector: 'mrp-loginRegister',
    moduleId: module.id,
    templateUrl: './loginRegister.component.html',
    styleUrls: ['./loginRegister.component.css']
})
export class LoginRegisterComponent{
    pageTitle: string = 'Login Page';
    errorMsg: string;
    activeForm: number = 0;
    logInfo: LoginInfo = new LoginInfo();
    regInfo: RegistrationInfo = new RegistrationInfo();
    recInfo: RecoveryInfo = new RecoveryInfo();

    constructor(
            private _usersService:UsersService,
            private _route:ActivatedRoute,
            private _router:Router){
        this._usersService.emitChange(null);
        let id = +this._route.snapshot.params['form'];
        if(id >= 0 && id < 3)
            this.activeForm = id;
    }
     
    submit() {
        if(this.activeForm == 0){
            this._usersService.loginSubmit(this.logInfo)
                .subscribe(res => this.saveLoginInfo(res),
                        error => this.errorMsg = <any>error);
        }
        else if(this.activeForm == 1){
            this._usersService.registrationSubmit(this.regInfo)
                .subscribe((res:any) => <boolean>res ? this.activeForm = 0 : this.errorMsg = 'Registration Failed',
                        (error:any) => this.errorMsg = <any>error);
        }
        else{
            this._usersService.recoverySubmit(this.recInfo)
                .subscribe((res:any) => <boolean>res ? this.errorMsg = 'a temperary password has been sent to your email' : this.errorMsg = 'Recovery Failed', 
                        (error:any) => this.errorMsg = <any>error);
        }
    }

    saveLoginInfo(res:any): void{
        sessionStorage.setItem('token', JSON.stringify({ token: res.access_token, username: this.logInfo.Username }));
        this._usersService.getLoggedUser(this.logInfo.Username)
           .subscribe(u => this._usersService.emitChange(new User().fromJSON(u)),
           (error:any) => this.errorMsg = <any>error);
        this._router.navigate(['./findPatient']);
    }
}