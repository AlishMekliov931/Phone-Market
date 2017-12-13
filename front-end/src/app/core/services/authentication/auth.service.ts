import { Injectable, ViewContainerRef } from "@angular/core";
import { LoginModel } from "../../models/input-models/login.model";
import { HttpClientService } from "../http-client.service";
import { Router } from "@angular/router";
import { RegisterModel } from "../../models/input-models/register-model";
import { Subject } from "rxjs/Subject";
import { Subscribable } from "rxjs/Observable";
import { retry } from "rxjs/operators/retry";


@Injectable()
export class AuthService {
  public redirectUrl: string;
  public username: string;
  constructor(
    private httpService: HttpClientService,
    private router: Router,

  ) {

  }

  login(loginModel: LoginModel): Subscribable<Object> {
    return this.httpService.post('auth/login', loginModel, false)
  }

  register(registerModel: RegisterModel): Subscribable<Object> {
    return this.httpService.post('auth/signup', registerModel, false)
  }

  logout(): void {
    sessionStorage.clear()
    this.username = ''   
    this.redirectUrl = ''
    this.tryNavigate()
    this.redirectUrl = ''
    
  }

  isCommentOwner(id): boolean {
    return sessionStorage.getItem('id') === id || this.isAdmin()
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('authtoken') === null;
  }

  isAdmin() : boolean {
    return sessionStorage.getItem('role') === "Admin";
  }

  tryNavigate() {
    if (this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
    } else {
      this.router.navigate(["/"]);
    }
  }
}