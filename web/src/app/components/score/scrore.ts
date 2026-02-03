import { Component, inject, Input, signal } from '@angular/core';
import { CommentStore } from '../../store/comment-store';

type ScoreData =
  | { type: 'comment'; comment_id: number; username: string }
  | { type: 'reply'; comment_id: number; reply_id: number; username: string };

@Component({
  selector: 'score',
  imports: [],
  template: `
    <div class="flex flex-col gap-4 items-center ">
        <div (click)="upVote()">
            <img
                src="assets/icon-plus.svg"
                alt="icon-plus"
                class="cursor-pointer"
            />
        </div>
        <span class="text-sm text-purple-600">{{score}}</span>
        <div (click)="downVote()">
            <img
                src="assets/icon-minus.svg"
                alt="icon-plus"
                class="cursor-pointer"
            />
        </div>
    </div>
        
  `,
})

export class ScoreComponent {
    @Input() score:number = 0;
    @Input() data:ScoreData | undefined;
    store = inject(CommentStore);


    upVote() {
        if (this.score >= 20) return;
        this.score += 1;
        if (this.data?.type === "reply") {
            this.store.updateReplyScore(this.data?.comment_id, this.data?.reply_id, this.score );    
        } else {
            this.store.updateCommentScore(this.data?.comment_id, this.score);
        }
    }

    downVote() {
        if (this.score <= 0) return;   
        this.score -= 1;
        if (this.data?.type === "reply") {
            this.store.updateReplyScore(this.data?.comment_id, this.data?.reply_id, this.score );    
        } else {
            this.store.updateCommentScore(this.data?.comment_id, this.score);
        }
    }
}
