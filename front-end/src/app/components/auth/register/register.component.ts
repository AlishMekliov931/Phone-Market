import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { AuthService } from "../../../core/services/authentication/auth.service";
import {
    FormGroup,
    FormBuilder,
    Validators,
    AbstractControl
} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { RegisterModel } from "../../../core/models/input-models/register-model";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { HomeService } from "../../../core/services/home/home.service";


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css', '../auth.css'],
})
export class RegisterComponent implements OnInit {
    private user: RegisterModel
    public model: FormGroup;
    public pass: string
    public regFail: boolean;
    public usernameMessage: string
    public emailMessage: string
    public passMessage: string
    public confirmPassMessage: string

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        public homeServer: HomeService
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        const mailRegex: string = '(.+)@(.+){2,}\.(.+){2,}'
        this.model = this.fb.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern(new RegExp(mailRegex))]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPass: ['', [Validators.required, this.passChek.bind(this)]],
        })

        this.regValidator.usernameControl()
        this.regValidator.emailControl()
        this.regValidator.passControl()
        this.regValidator.confirmPass()

        this.onChanges()
    }

    register() {
        this.user = new RegisterModel(
            this.model.value.username,
            this.model.value.email,
            this.model.value.password)
        this.authService.register(this.user).subscribe(res => {
            if (res["success"]) {
                // this.homeServer.toggleAuth()
                this.toastr.success(res["message"], 'Success!');
                this.model.reset()
            } else {
                this.toastr.error(res["message"], 'Error!');
            }
        })
    }

    onChanges() {
        this.model.statusChanges.subscribe(value => {
            this.regFail = value === 'VALID'
        })
    }

    passChek(e) {
        return e.value !== this.pass ? { Passwords_Not_Much: true } : null

    }

    regValidator = {
        usernameControl: () => {
            const usernameControl = this.model.get('username')
            usernameControl.valueChanges
                .debounceTime(500)
                .subscribe(value => {
                    this.usernameMessage = (usernameControl.touched || usernameControl.dirty) && usernameControl.errors ?
                        Object.keys(usernameControl.errors)[0] : ''
                })
        },
        emailControl: () => {
            const emailControl = this.model.get('email')
            emailControl.valueChanges
                .debounceTime(500)
                .subscribe(value => {
                    this.emailMessage = (emailControl.touched || emailControl.dirty) && emailControl.errors ?
                        Object.keys(emailControl.errors)[0] : ''
                })
        },
        passControl: () => {
            const passControl = this.model.get('password')
            passControl.valueChanges
                .debounceTime(500)
                .subscribe(value => {
                    this.passMessage = (passControl.touched || passControl.dirty) && passControl.errors ?
                        Object.keys(passControl.errors)[0] : ''
                })
        },
        confirmPass: () => {
            const congirmPassControl = this.model.get('confirmPass')
            congirmPassControl.valueChanges
                .debounceTime(500)
                .subscribe(value => {
                    this.confirmPassMessage = (congirmPassControl.touched || congirmPassControl.dirty) && congirmPassControl.errors ?
                        Object.keys(congirmPassControl.errors)[0] : ''
                    // this.confirmPassMessage = value === this.pass ? '' : 'Passwords do not much.'
                })
        }
    }
}