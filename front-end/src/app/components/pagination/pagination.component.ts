import { Component, OnInit } from "@angular/core";
import { PhoneService } from "../../core/services/phone/phone.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'

const countPhone = 6

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
    public pages: number[]
    private page: number
    private sub: any
    private nextPageNum: number
    constructor(
        private phoneService: PhoneService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.pages = []
    }

    ngOnInit() {
        this.route.queryParams.debounceTime(500).distinctUntilChanged().subscribe(p => {
            let serach = p.serach || ''
            this.phoneService.getCount(`?serach=${serach}`).subscribe(allPhone => {
                this.pages = []
                let phones = Math.ceil(Number(allPhone["count"]) / countPhone)
                for (let i = 1; i <= phones; i++) {
                    this.pages.push(i)
                }
            })
        })
        

        this.sub = this.route
            .queryParams
            .subscribe(params => {
                // Defaults to 0 if no query param provided.
                this.page = +params['page'] || 0;
            });
    }

    nextPage() {
        this.page === 0 ? this.page = 1 : this.page
        ++this.page <= this.pages.length ? this.page : --this.page
        this.router.navigate(['phone/list'], { queryParams: { page: this.page }, queryParamsHandling: 'merge' });
    }

    prevPage() {
        let baseUrl: any
        this.route.queryParams.subscribe(res => {
            baseUrl = JSON.stringify(res)
        })
        --this.page >= 1 ? this.page : ++this.page
        this.router.navigate(['phone/list' + ''], { queryParams: { page: this.page }, queryParamsHandling: 'merge' });
    }
}