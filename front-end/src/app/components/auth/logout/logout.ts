import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../core/services/authentication/auth.service";
import { LoginModel } from "../../../core/models/input-models/login.model";


@Component({
    template: ''
})
export class LogoutComponent implements OnInit {
    

    constructor(
        private authService: AuthService
    ) {
       
    }

    ngOnInit() {
        this.authService.logout()
    }
}