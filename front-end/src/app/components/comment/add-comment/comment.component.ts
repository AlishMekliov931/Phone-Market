import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from "../../../core/services/comment/comment.service";


@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
    public text: string
    constructor(
        private commentService: CommentService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
    }

    ngOnInit() {

    }

    post(e) {

        this.text = e.target[0].value
        if (!this.text || !sessionStorage.getItem('authtoken')) {
            alert('Canot post empty comment')
            return
        }
        this.route.params.subscribe(params => {
            let phoneId = params['id']
            this.commentService.addComment({text:this.text, phoneId}).subscribe(res => {
                this.commentService.loadComments(phoneId)
                e.target[0].value = ''
            })
        })
    }
}