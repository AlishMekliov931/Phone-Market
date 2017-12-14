import { Injectable } from "@angular/core";
import { HttpClientService } from "../http-client.service";
import { Subscribable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

@Injectable()
export class OrderService {
    constructor(
        private httpService: HttpClientService,
    ) {

    }

    addOrder(phoneId): Subscribable<Object>{
        let userId = sessionStorage.getItem('id')
        return this.httpService.post(`purchase/create/${phoneId}/${userId}`, {}, true)
    }

    getDetails(phoneId): Subscribable<Object>{
        return this.httpService.get(`purchase/details/${phoneId}`, true)
    }

    getAllOrders(): Subscribable<Object>{
        let userId = sessionStorage.getItem('id')
        return this.httpService.get(`purchase/status/${userId}`, true)
    }

    updateStatus(id, status){
        let userId = sessionStorage.getItem('id')
        return this.httpService.post(`purchase/status/${id}/${userId}`, {status}, true)        
    }

}