import { EnumToOptionsFilter } from './../shared/components/enumToOptionsFilter.pipe';
import { PatientsFormSchemaService } from './../shared/services/patientsFormSchema.service';
import { PatientsService } from '../shared/services/patients.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../shared/services/users.service';
import { User } from './../shared/user';

@Component({
    selector: 'mrp-main-app',
    moduleId: module.id,
    templateUrl: './mainApp.component.html',
    styleUrls: ['./mainApp.component.css'],
    providers:[PatientsService,UsersService,PatientsFormSchemaService,EnumToOptionsFilter]
})
export class MainAppComponent implements OnInit{
    loggedInUser:User;
    pageTitle:string = 'Medical Research Project';
    loginTitle:string;
    loggedIn:boolean = false;

    constructor(private router:Router,private usersService:UsersService){
        this.usersService.changeEmitted$.subscribe(user => this.login(user));
        
    }
    ngOnInit():void{
        if(!this.loggedInUser && sessionStorage.getItem("token")){
            let un = JSON.parse(sessionStorage.getItem('token')).username;
            this.usersService.getLoggedUser(un)
                .subscribe(res => this.usersService.emitChange(new User().fromJSON(res)), 
                (error:any) => this.logout());
        }
    }
    login(user:User):void{
        if(user){
            this.loggedIn = true;
            this.loggedInUser = user;
            this.loginTitle = 'hello '+user.UserName;
        }
    }
    logout():void{
        this.loggedIn = false;
        this.usersService.logout();
        this.router.navigate(['/login']);
    }
}