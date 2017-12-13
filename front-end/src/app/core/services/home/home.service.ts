import { Injectable } from "@angular/core";
import { HttpClientService } from "../http-client.service";
import { Router } from "@angular/router";
import { Subscribable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";



@Injectable()
export class HomeService {
    constructor(
        private httpService: HttpClientService,
    ) {
    }

}