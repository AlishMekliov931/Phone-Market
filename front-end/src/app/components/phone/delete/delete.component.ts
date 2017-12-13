import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from "../../../core/services/authentication/auth.service";
import { PhoneService } from "../../../core/services/phone/phone.service";

@Component({
    template: '',
})
export class DeleteComponent implements OnInit {
    constructor(
        private phoneService: PhoneService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.route.params.subscribe(p => {
            this.phoneService.deletePhone(p['id']).subscribe(res => {
                this.authService.tryNavigate()
            })
        })
    }

    ngOnInit() {        
    
    }

}