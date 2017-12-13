import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../../core/services/authentication/auth.service";
import { PhoneViewModel } from "../../core/models/view-models/phone";
import { PhoneService } from "../../core/services/phone/phone.service";


@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public newPhone: PhoneViewModel[]
    public showPhone: boolean
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public authService: AuthService,
        public phoneService: PhoneService,
    ) {
    }

    ngOnInit() {
        this.phoneService.getNewPhones().subscribe(res => {
            if (res["success"]) {
            this.newPhone = res['phones']  
            this.showPhone = this.newPhone.length === 3
            } else {
                alert(res['message'])
            }
        })     
    }


}