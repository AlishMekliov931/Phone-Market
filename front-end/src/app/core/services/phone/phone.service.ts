import { Injectable } from "@angular/core";
import { HttpClientService } from "../http-client.service";
import { Router } from "@angular/router";
import { Subscribable } from "rxjs/Observable";

import { PhoneInputModel } from "../../models/input-models/phone";
import { PhoneViewModel } from "../../models/view-models/phone";


@Injectable()
export class PhoneService {

  constructor(
    private httpService: HttpClientService,
    private router: Router,
  ) {

  }

  getAll(queryParams): Subscribable<Object> {
    return this.httpService.get('phone/all' + queryParams, false)
  }

  getCount(queryParams): Subscribable<Number> {
    return this.httpService.get('phone/count' + queryParams, false)
  }

  getDetails(id): Subscribable<PhoneViewModel> {
    return this.httpService.get('phone/details/' + id, false)
  }

  addPhone(phone: PhoneInputModel): Subscribable<Object> {
    let id = sessionStorage.getItem('id')
    return this.httpService.post('phone/create/' + id, phone, true)
  }

  deletePhone(id): Subscribable<Object> {
    let userId = sessionStorage.getItem('id')
    
    return this.httpService.get('phone/delete/' + id + '/' + userId, true)
  }

  editPhone(id, body): Subscribable<Object> {
    let userId = sessionStorage.getItem('id')
    
    return this.httpService.post('phone/edit/' + id + '/' + userId, body, true)
  }

  getNewPhones(): Subscribable<Object>{
    return this.httpService.get('phone/newPhones', false)
  }

}