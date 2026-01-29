import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'up-vote',
  imports: [],
  template: `
    <div class="flex flex-col gap-3">
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

export class UpvotesComponent {
    @Input() score:number = 0;
    
    upVote() {
        this.score += 1;    
    }

    downVote() {
        this.score -= 1;
    }
}
